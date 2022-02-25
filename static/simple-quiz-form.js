"use strict";

function SimpleQuizForm(points, questions, callback) {

  function mkElement(tag, attrs, html, childNodes) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(kv => el.setAttribute(kv[0], kv[1]));
    }
    if (html) {
      el.innerHTML = html;
    }
    if (childNodes) {
      childNodes.forEach(child => el.appendChild(child));
    }
    return el;
  };

  const state = questions.map(qlc => ({
    correct: qlc.options.map(o => o.correct || false),
    selected: qlc.options.map(_ => false),
    solved: false,
  }));

  function updateSolved(qlcIndex) {
    const qlc = state[qlcIndex];
    for (let i = 0; i < qlc.correct.length; i += 1) {
      if (qlc.selected[i] != qlc.correct[i]) {
        qlc.solved = false;
        return;
      }
    }
    qlc.solved = true;
  }

  function reportState(qlcIndex, optionIndex, many) {
    state[qlcIndex].selected = state[qlcIndex].selected.map((old, i) =>
      i === optionIndex ? true : (many ? old : false));
    updateSolved(qlcIndex);
    console.log(state);
    callback(state.filter(qlc => qlc.solved).length, state.length);
  }

  return mkElement(
    'form',
    { class: 'qlc-wrap' },
    `<p>Study your program above to answer these questions for ${points} more points!</p>`,
    questions.map((qlc, qlcIndex) => {
      const many = qlc.options.filter(o => o.correct).length > 1;
      return mkElement(
        'div',
        { class: 'qlc' },
        `<strong>${qlc.question}</strong>`,
        qlc.options.map((o, i) => {
          const label = mkElement(
            'label',
            {},
            `<input type="${many ? 'checkbox' : 'radio'}" name="qlc${qlcIndex}" value="${i}"> ${o.answer}`
          );
          label.querySelector('input').addEventListener('change', evt => {
            label.parentNode.querySelectorAll('label').forEach(l => l.removeAttribute('class'));
            label.setAttribute('class', o.correct ? 'correct' : 'incorrect');
            if (label.querySelector('span.info') === null && o.info) {
              label.appendChild(mkElement('span', { class: 'info' }, o.info));
            }
            reportState(qlcIndex, i, many);
          });
          return label;
        })
      );
    })
  );
}
