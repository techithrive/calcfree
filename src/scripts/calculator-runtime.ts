/**
 * Client runtime that makes the tool forms work. Progressive enhancement: the
 * form is already valid static HTML; this adds the calculation on the client.
 * It reads inputs by data-field, runs the calculator matching data-calc, and
 * renders the result into [data-calc-result].
 */
import { calculators } from '../lib/calculators';
import { isCalcError } from '../lib/calculators/types';

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  );
}

function run(form: HTMLFormElement): void {
  const id = form.getAttribute('data-calc') ?? '';
  const calc = calculators[id];
  const resultEl = form.querySelector<HTMLElement>('[data-calc-result]');
  if (!resultEl) return;

  if (!calc) {
    resultEl.hidden = false;
    resultEl.innerHTML = '<p class="field-error">This calculator isn\'t available yet.</p>';
    return;
  }

  const values: Record<string, string> = {};
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-field]').forEach((el) => {
    const key = el.getAttribute('data-field');
    if (!key) return;
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      values[key] = el.checked ? 'true' : 'false';
    } else {
      values[key] = el.value;
    }
  });

  const output = calc.calculate(values);
  resultEl.hidden = false;

  if (isCalcError(output)) {
    resultEl.innerHTML = `<p class="field-error">${escapeHtml(output.error)}</p>`;
    return;
  }

  let html = '';
  if (output.headline) {
    html += `<p class="result-headline">${escapeHtml(output.headline)}</p>`;
  }
  if (output.rows.length) {
    html +=
      '<table class="result-table"><tbody>' +
      output.rows
        .map(
          (r) =>
            `<tr><th${r.emphasis ? ' style="font-weight:700"' : ''}>${escapeHtml(
              r.label
            )}</th><td${r.emphasis ? ' style="font-weight:700"' : ''}>${escapeHtml(r.value)}</td></tr>`
        )
        .join('') +
      '</tbody></table>';
  }
  if (output.notes?.length) {
    html +=
      '<div class="disclaimer" style="margin-top: var(--sp-3);">' +
      output.notes.map((n) => `<p>${escapeHtml(n)}</p>`).join('') +
      '</div>';
  }
  resultEl.innerHTML = html;
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelectorAll<HTMLFormElement>('form[data-calc]').forEach((form) => {
  const btn = form.querySelector<HTMLButtonElement>('[data-calc-run]');
  btn?.addEventListener('click', () => run(form));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run(form);
  });
});
