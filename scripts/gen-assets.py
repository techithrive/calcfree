#!/usr/bin/env python3
"""Generate lightweight branded WebP visuals for CalcFree. No photos/people/AI art."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "public/images/assets"
os.makedirs(OUT, exist_ok=True)

INK=(20,20,28); INK_SOFT=(58,58,72); TEAL=(15,118,110); TEAL_SOFT=(45,212,191)
TEAL_TINT=(230,242,240); TEAL_TINT2=(211,234,231); AMBER=(180,83,9); AMBER_TINT=(253,242,227)
INDIGO=(67,56,202); INDIGO_TINT=(236,234,251); WHITE=(255,255,255); LINE=(232,231,236); PAPER=(247,246,243)

def font(size, bold=False):
    p = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    return ImageFont.truetype(p, size) if os.path.exists(p) else ImageFont.load_default()

def rounded(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def save(img, name, q=82):
    path=f"{OUT}/{name}.webp"; img.save(path,"WEBP",quality=q,method=6)
    print(f"  {name}.webp {img.size[0]}x{img.size[1]} {os.path.getsize(path)/1024:.1f}KB")

def hero():
    W,H=1000,760; img=Image.new("RGB",(W,H),PAPER); d=ImageDraw.Draw(img)
    d.ellipse([W*0.35,-160,W+220,360],fill=TEAL_TINT)
    card=[80,90,W-80,H-90]
    d.rounded_rectangle([card[0]+10,card[1]+18,card[2]+10,card[3]+18],radius=28,fill=(225,224,230))
    rounded(d,card,28,fill=WHITE,outline=LINE,width=2)
    d.rectangle([card[0],card[1]+30,card[2],card[1]+58],fill=WHITE)
    d.rounded_rectangle([card[0],card[1],card[2],card[1]+58],radius=28,fill=WHITE)
    for i,col in enumerate([(255,95,86),(255,189,46),(39,201,63)]):
        d.ellipse([card[0]+28+i*26,card[1]+22,card[0]+44+i*26,card[1]+38],fill=col)
    d.line([card[0],card[1]+58,card[2],card[1]+58],fill=LINE,width=2)
    fx,fy=card[0]+40,card[1]+92
    d.text((fx,fy),"CIS Tax Refund",font=font(30,True),fill=INK); fy+=54
    for lab,val in [("Gross earnings","£32,000"),("Expenses","£3,000"),("CIS deducted","£6,000")]:
        d.text((fx,fy),lab,font=font(18),fill=INK_SOFT)
        rounded(d,[fx,fy+26,fx+360,fy+70],10,fill=PAPER,outline=LINE,width=2)
        d.text((fx+16,fy+38),val,font=font(20,True),fill=INK); fy+=92
    rounded(d,[fx,fy+4,fx+200,fy+52],12,fill=TEAL)
    d.text((fx+44,fy+18),"Calculate",font=font(20,True),fill=WHITE)
    rx,ry=card[0]+470,card[1]+92
    rounded(d,[rx,ry,card[2]-40,card[3]-40],18,fill=TEAL_TINT,outline=TEAL_TINT2,width=2)
    d.text((rx+28,ry+28),"ESTIMATED REFUND",font=font(15,True),fill=TEAL)
    d.text((rx+28,ry+54),"£1,728",font=font(64,True),fill=(10,74,69))
    yy=ry+150
    for lab,val in [("Taxable profit","£29,000"),("Income tax","£3,286"),("Class 4 NI","£986")]:
        d.text((rx+28,yy),lab,font=font(17),fill=INK_SOFT)
        w=d.textlength(val,font=font(17,True)); d.text((card[2]-68-w,yy),val,font=font(17,True),fill=INK)
        d.line([rx+28,yy+30,card[2]-68,yy+30],fill=TEAL_TINT2,width=1); yy+=46
    save(img,"hero-calculator")

def tile(name,glyph,base,tint,accent,label):
    W,H=800,500; img=Image.new("RGB",(W,H),tint); d=ImageDraw.Draw(img)
    d.ellipse([W*0.55,-120,W+160,300],fill=base)
    rounded(d,[70,110,W-70,H-70],24,fill=WHITE,outline=LINE,width=2)
    glyph(d,accent); d.text((110,150),label,font=font(30,True),fill=INK); save(img,name)

def g_tax(d,a):
    x,y=110,230; d.polygon([(x,y+20),(x+150,y-40),(x+300,y+20)],fill=a)
    for i in range(4): cx=x+20+i*72; d.rectangle([cx,y+30,cx+44,y+210],fill=a)
    d.rectangle([x-10,y+210,x+310,y+230],fill=a)
def g_home(d,a):
    x,y=120,250; d.polygon([(x,y+10),(x+140,y-70),(x+280,y+10)],fill=a)
    d.rectangle([x+30,y+10,x+250,y+190],fill=a); d.rectangle([x+110,y+90,x+170,y+190],fill=WHITE)
def g_calc(d,a):
    x,y=130,165; rounded(d,[x,y,x+260,y+250],18,fill=a); rounded(d,[x+24,y+24,x+236,y+78],8,fill=WHITE)
    for r in range(3):
        for c in range(3):
            cx,cy=x+30+c*78,y+100+r*48; d.ellipse([cx,cy,cx+40,cy+30],fill=WHITE)

def blog(name,lines,accent,tint,glyph):
    W,H=800,450; img=Image.new("RGB",(W,H),tint); d=ImageDraw.Draw(img)
    d.ellipse([W*0.6,-140,W+180,260],fill=accent); d.rectangle([0,0,14,H],fill=accent)
    d.text((56,36),"CALCFREE GUIDE",font=font(16,True),fill=accent); ty=80
    for line in lines: d.text((56,ty),line,font=font(38,True),fill=INK); ty+=52
    glyph(d,accent); save(img,name)

def b_doc(d,a):
    x,y=560,250; rounded(d,[x,y,x+150,y+150],16,fill=WHITE,outline=a,width=4)
    for i in range(4): d.line([x+24,y+34+i*26,x+126,y+34+i*26],fill=a,width=5)
def b_coins(d,a):
    x,y=580,240
    for i in range(3): d.ellipse([x,y+i*22,x+130,y+70+i*22],fill=WHITE,outline=a,width=4)
def b_scale(d,a):
    x,y=590,250; d.line([x+60,y,x+60,y+150],fill=WHITE,width=6); d.line([x,y+30,x+120,y+30],fill=WHITE,width=6)
    d.ellipse([x-18,y+30,x+18,y+66],outline=WHITE,width=6); d.ellipse([x+102,y+30,x+138,y+66],outline=WHITE,width=6)
def b_car(d,a):
    x,y=560,270; rounded(d,[x,y+30,x+170,y+90],16,fill=WHITE); rounded(d,[x+30,y,x+140,y+45],12,fill=WHITE)
    d.ellipse([x+22,y+78,x+58,y+114],fill=a); d.ellipse([x+112,y+78,x+148,y+114],fill=a)

def og():
    W,H=1200,630; img=Image.new("RGB",(W,H),INK); d=ImageDraw.Draw(img)
    d.rectangle([0,0,W,10],fill=TEAL); d.ellipse([W*0.62,-200,W+200,360],fill=(26,52,58))
    d.text((80,210),"Calc",font=font(96,True),fill=WHITE); cw=d.textlength("Calc",font=font(96,True))
    d.text((80+cw,210),"Free",font=font(96,True),fill=TEAL_SOFT)
    d.text((84,330),"Calculators that show their working",font=font(40),fill=(201,200,211))
    d.text((84,400),"Tax · contractor · home-project tools · sources you can check",font=font(26),fill=(150,150,165))
    img.save("public/og-default.png","PNG",optimize=True)
    print(f"  og-default.png {W}x{H} {os.path.getsize('public/og-default.png')/1024:.1f}KB")

print("Generating assets:")
hero()
tile("category-uk-contractor-tax",g_tax,TEAL,TEAL_TINT,TEAL,"UK Contractor & Tax")
tile("category-home-project-costs",g_home,AMBER,AMBER_TINT,AMBER,"Home Project Costs")
tile("tool-default",g_calc,TEAL,TEAL_TINT,TEAL,"CalcFree tool")
blog("blog-cis-deductions",["CIS deductions","explained"],TEAL,TEAL_TINT,b_doc)
blog("blog-cis-expenses",["CIS allowable","expenses"],TEAL,TEAL_TINT2,b_coins)
blog("blog-umbrella-vs-ltd",["Umbrella vs","limited company"],INDIGO,INDIGO_TINT,b_scale)
blog("blog-ir35",["IR35 explained","for contractors"],INDIGO,INDIGO_TINT,b_scale)
blog("blog-side-hustle",["Side hustle tax","& HMRC"],AMBER,AMBER_TINT,b_coins)
blog("blog-company-car",["Company car tax","EV vs petrol"],TEAL,TEAL_TINT,b_car)
og()
print("Done.")
