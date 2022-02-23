"use strict";

function SimpleQuizForm(points, questions, callback) {
  const wrap = document.createElement('div');
  wrap.setAttribute('class', 'qlc-wrap');
  wrap.innerHTML = `
    <p>Study your program above to answer these questions for ${points} more points!</p>
    <form>
      ${questions.map((qlc, n) => {
        const many = qlc.options.filter(o => o.correct).length > 1;
        return `
          <div class="qlc">
            <strong>${qlc.question}</strong>
            ${qlc.options.map((o, i) => `
              <label>
                <input type="${many ? 'checkbox' : 'radio'}" name="qlc${n}" value="${i}">
                ${o.answer}
              </label>
            `).join('\n')}
          </div>
        `;
      }).join('\n')}
    </form>
  `;
  wrap.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (ev) => {
      console.log(ev.target);
    });
  });
  return wrap;
}
