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

  function updateSolved(qlcState) {
    for (let i = 0; i < qlcState.correct.length; i += 1) {
      if (qlcState.selected[i] != qlcState.correct[i]) {
        qlcState.solved = false;
        return false;
      }
    }
    qlcState.solved = true;
    return true;
  }

  function selectOption(qlcIndex, optionIndex, isChecked, many) {
    const qlcState = state[qlcIndex];
    qlcState.selected = qlcState.selected.map(
      (old, i) => i === optionIndex ? isChecked : (many ? old : false)
    );
    return updateSolved(qlcState);
  }

  function reportState(qlcIndex, optionIndex, isChecked, many) {
    const isSolved = selectOption(qlcIndex, optionIndex, isChecked, many);
    setTimeout(() => callback(
      qlcIndex,
      optionIndex,
      isChecked,
      state.filter(qs => qs.solved).length,
      state.length
    ));
    return isSolved;
  }

  function displayInfo(label, info) {
    if (info && label.querySelector('span.info') === null) {
      label.appendChild(mkElement('span', { class: 'info' }, info));
    }
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
            const isChecked = evt.target.checked;
            if (!many) {
              label.parentNode.querySelectorAll('label').forEach(
                l => l.removeAttribute('class')
              );
            }
            if (isChecked) {
              label.setAttribute('class', o.correct ? 'correct' : 'incorrect');
            } else {
              label.removeAttribute('class');
            }
            if (reportState(qlcIndex, i, isChecked, many)) {
              label.parentNode.querySelectorAll('label').forEach(
                (l, i) => displayInfo(l, qlc.options[i].info)
              );
            } else {
              displayInfo(label, o.info);
            }
          });
          return label;
        })
      );
    })
  );
}
