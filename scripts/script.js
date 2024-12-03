import { rewards, selectReward } from "../data/rewards.js";
import { projectData } from "../data/projectData.js";
import { renderSelectModal } from "./selectModal.js";

function renderRewards() {
  let rewardsHTML = '';

  rewards.forEach((reward) => {
    const {name} = reward;
    const {pledgeAmt} = reward;
    const {info} = reward;
    const {quantity} = reward;

    if (quantity > 0) {
      rewardsHTML += `
        <div class="about__pledge">
          <div class="pledge__reward-pledge">
            <h4 class="pledge__reward">
              ${name}
            </h4>
            <span class="pledge__pledge-amt">
              Pledge $${pledgeAmt} or more
            </span>
          </div>
          <p class="pledge__info">
            ${info}
          </p>
          <div class="pledge__q-btn-container">
            <p class="pledge__reward-info">
              <span class="pledge__reward-quantity">
                ${quantity}
              </span> left
            </p>
            <button class="btn project__btn pledge__reward-btn js-select-reward"
            data-reward-id="${reward.id}">
              Select Reward
            </button>
          </div>
        </div>
      `;

    } else {
      rewardsHTML += `
        <div class="about__pledge reward-out-of-stock">
          <div class="out-of-stock-overlay"></div>
          <div class="pledge__reward-pledge">
            <h4 class="pledge__reward">
              ${name}
            </h4>
            <span class="pledge__pledge-amt">
              Pledge $${pledgeAmt} or more
            </span>
          </div>
          <p class="pledge__info">
            ${info}
          </p>
          <div class="pledge__q-btn-container">
            <p class="pledge__reward-info">
              <span class="pledge__reward-quantity">
                ${quantity}
              </span> left
            </p>
            <button disabled class="btn project__btn pledge__reward-btn  js-select-reward"
            data-reward-id="${reward.id}">
              Out of stock
            </button>
          </div>
        </div>
      `;
    }
  });

  document.querySelector('.js-about__pledges')
    .innerHTML = rewardsHTML;

  selectReward();
}

renderRewards();

function renderProjectData() {
  const {backedAmt} = projectData;
  const {backers} = projectData;
  const {remainingDays} = projectData;

  const projectDataHTML = `
    <div class="data__value-text">
      <span class="data__value">
        $${backedAmt.toLocaleString('en-US')}
      </span>
      <span class="data__text">
        of $100,000 backed
      </span>
    </div>
    <div class="data__value-text">
      <span class="data__value">
        ${backers}
      </span>
      <span class="data__text">
        total backers
      </span>
    </div>
    <div class="data__value-text">
      <span class="data__value">
        ${remainingDays}
      </span>
      <span class="data__text">
        days left
      </span>
    </div>
  `;

  document.querySelector('.js-data__container')
    .innerHTML = projectDataHTML;
}

renderProjectData();

document.querySelector('.js-project__bookmark')
  .addEventListener('click', () => {
    document.querySelector('.js-project__bookmark').classList.toggle('bookmarked');
  });

const selectModal = document.querySelector('.js-project__select-modal');

document.querySelector('.js-project__back-btn')
  addEventListener('click', () => {
    renderSelectModal();
    selectModal.showModal();
  });
