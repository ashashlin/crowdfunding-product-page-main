import { rewards } from "../data/rewards.js";

export function renderSelectModal() {
  let selectModalHTML = `
    <div class="select-modal__pledge">
      <div class="select-modal__pledge-details">
        <input class="select-modal__radio" type="radio" name="select-modal__radio" id="radio-0">
        <h4 class="select-modal__reward">
          Pledge with no reward
        </h4>
        <p class="select-modal__pledge-info">
          Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.
        </p>
      </div>
    </div>
  `;

  rewards.forEach((reward) => {
    const {name} = reward;
    const {pledgeAmt} = reward;
    const {info} = reward;
    const {quantity} = reward;

    if (quantity > 0) {
      selectModalHTML += `
        <div class="select-modal__pledge">
          <div class="select-modal__pledge-details">
            <input class="select-modal__radio" type="radio" name="select-modal__radio" id="radio-${reward.id}">
            <div class="select-modal__reward-pledge">
              <h4 class="select-modal__reward">
                ${name}
              </h4>
              <span class="select-modal__pledge-amt">
                Pledge $${pledgeAmt} or more
              </span>
            </div>
            <p class="select-modal__reward-info">
              <span class="select-modal__reward-quantity">${quantity}</span> left
            </p>
            <p class="select-modal__pledge-info">
              ${info}
            </p>
          </div>
        </div>
      `;

    } else {
      selectModalHTML += `
        <div class="select-modal__pledge reward-out-of-stock">
          <div class="out-of-stock-overlay"></div>
          <div class="select-modal__pledge-details">
            <input class="select-modal__radio" type="radio" name="select-modal__radio" id="radio-${reward.id}">
            <div class="select-modal__reward-pledge">
              <h4 class="select-modal__reward">
                ${name}
              </h4>
              <span class="select-modal__pledge-amt">
                Pledge $${pledgeAmt} or more
              </span>
            </div>
            <p class="select-modal__reward-info">
              <span class="select-modal__reward-quantity">${quantity}</span> left
            </p>
            <p class="select-modal__pledge-info">
              ${info}
            </p>
          </div>
        </div>
      `;
    }
  });

  document.querySelector('.js-select-modal-pledges')
    .innerHTML = selectModalHTML;
}
