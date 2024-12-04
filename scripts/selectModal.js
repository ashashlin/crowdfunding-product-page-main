import { projectData } from "../data/projectData.js";
import { rewards, updateRewardSelected } from "../data/rewards.js";
import { renderProjectData, renderRewards } from "./script.js";

export function renderSelectModal() {
  const rewardSelected = localStorage.getItem('rewardSelected');

  let selectModalHTML = `
    <div class="select-modal__pledge js-select-modal__pledge js-select-modal__pledge-no-reward">
      <div class="select-modal__pledge-details">
        <input class="select-modal__radio js-select-modal__radio js-select-modal__radio-no-reward"
        data-reward-id="no-reward"
        type="radio" name="select-modal__radio" id="radio-no-reward">
        <h4 class="select-modal__reward js-select-modal__reward js-select-modal__reward-no-reward"
        data-reward-id="no-reward">
          Pledge with no reward
        </h4>
        <p class="select-modal__pledge-info">
          Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.
        </p>
      </div>
      <div class="select-modal__pledge-input js-select-modal__pledge-input-no-reward">
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
        <div class="select-modal__pledge js-select-modal__pledge js-select-modal__pledge-${reward.id}">
          <div class="select-modal__pledge-details">
            <input class="select-modal__radio js-select-modal__radio js-select-modal__radio-${reward.id}"
            data-reward-id="${reward.id}"
            type="radio" name="select-modal__radio" id="radio-${reward.id}">
            <div class="select-modal__reward-pledge">
              <h4 class="select-modal__reward js-select-modal__reward js-select-modal__reward-${reward.id}"
              data-reward-id="${reward.id}">
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
          <div class="select-modal__pledge-input js-select-modal__pledge-input-${reward.id}">
          </div>
        </div>
      `;

    } else {
      selectModalHTML += `
        <div class="select-modal__pledge reward-out-of-stock js-select-modal__pledge js-select-modal__pledge-${reward.id}">
          <div class="out-of-stock-overlay"></div>
          <div class="select-modal__pledge-details">
            <input class="select-modal__radio js-select-modal__radio js-select-modal__radio-${reward.id}"
            data-reward-id="${reward.id}"
            type="radio" name="select-modal__radio" id="radio-${reward.id}">
            <div class="select-modal__reward-pledge">
              <h4 class="select-modal__reward js-select-modal__reward js-select-modal__reward-${reward.id}"
              data-reward-id="${reward.id}">
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
          <div class="select-modal__pledge-input js-select-modal__pledge-input-${reward.id}">
          </div>
        </div>
      `;
    }
  });

  document.querySelector('.js-select-modal-pledges')
    .innerHTML = selectModalHTML;

  if (!rewardSelected) {
    const pledgeSelected = document.querySelector('.js-select-modal__pledge-no-reward');

    const radioSelected = document.querySelector('.js-select-modal__radio-no-reward');

    const pledgeInput = document.querySelector('.js-select-modal__pledge-input-no-reward');

    pledgeSelected.classList.add('selected');

    radioSelected.setAttribute('checked', '');

    pledgeInput.innerHTML = `
      <p class="pledge-input__text">
        Enter your pledge
      </p>
      <div class="pledge-input__input-btn">
        <div class="pledge-input-box js-pledge-input-box-no-reward">
          $
          <input class="pledge-amt js-pledge-amt js-pledge-amt-no-reward"
          data-reward-id="no-reward"
          type="text" name="pledge-amount" id="pledge-amt-no-reward">
        </div>
        <button class="btn project__btn select-modal__btn js-select-modal__btn"
        data-reward-id="no-reward">
          Continue
        </button>
      </div>
    `;

  } else {
    const pledgeInput = document.querySelector(`.js-select-modal__pledge-input-${rewardSelected}`);

    const pledges = document.querySelectorAll('.js-select-modal__pledge');

    const radioSelected = document.querySelector(`.js-select-modal__radio-${rewardSelected}`);

    pledgeInput.innerHTML = `
      <p class="pledge-input__text">
        Enter your pledge
      </p>
      <div class="pledge-input__input-btn">
        <div class="pledge-input-box js-pledge-input-box-${rewardSelected}">
          $
          <input class="pledge-amt js-pledge-amt js-pledge-amt-${rewardSelected}"
          data-reward-id="${rewardSelected}"
          type="text" name="pledge-amount" id="pledge-amt-${rewardSelected}">
        </div>
        <button class="btn project__btn select-modal__btn js-select-modal__btn"
        data-reward-id="${rewardSelected}">
          Continue
        </button>
      </div>
    `;

    pledges.forEach((pledge) => {
      if (pledge.classList.contains(`js-select-modal__pledge-${rewardSelected}`)) {
        pledge.classList.add('selected');
      }
    });

    radioSelected.setAttribute('checked', '');
  }

  const radios = document.querySelectorAll('.js-select-modal__radio');

  radios.forEach((radio) => {
    radio.addEventListener('click', () => {
      const {rewardId} = radio.dataset;

      updateRewardSelected(rewardId);

      renderSelectModal();
    });
  });

  const selectModalRewards = document.querySelectorAll('.js-select-modal__reward');

  selectModalRewards.forEach((reward) => {
    reward.addEventListener('click', () => {
      const {rewardId} = reward.dataset;

      updateRewardSelected(rewardId);

      renderSelectModal();
    });
  });

  const pledgeInputs = document.querySelectorAll('.js-pledge-amt');

  pledgeInputs.forEach((input) => {
    input.addEventListener('click', () => {
      const {rewardId} = input.dataset;
      const inputBox = document.querySelector(`.js-pledge-input-box-${rewardId}`);

      inputBox.classList.add('active');

      document.body.addEventListener('click', (e) => {
        if (!(e.target.classList.contains(`js-pledge-amt-${rewardId}`))) {
          inputBox.classList.remove('active');
        }
      });
    });
  });

  const continueBtns = document.querySelectorAll('.js-select-modal__btn');

  continueBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const {rewardId} = button.dataset;
      const inputElement = document.querySelector(`.js-pledge-amt-${rewardId}`);
      const input = Number(inputElement.value);

      projectData.backedAmt += input;
      projectData.backers++;

      localStorage.setItem('projectData', JSON.stringify(projectData));

      let matchingReward;

      rewards.forEach((reward) => {
        if (reward.id === rewardId) {
          matchingReward = reward;
        }
      });

      if (matchingReward) {
        matchingReward.quantity--;

        localStorage.setItem('rewards', JSON.stringify(rewards));
      }

      const selectModal = document.querySelector('.js-project__select-modal');

      selectModal.close();

      renderProjectData();
      renderRewards();

      const successModal = document.querySelector('.js-project__success-modal');

      successModal.showModal();
    });
  });

  document.querySelector('.js-select-modal__close')
    .addEventListener('click', () => {
      const selectModal = document.querySelector('.js-project__select-modal');

      selectModal.close();
    });
}
