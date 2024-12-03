import { rewards } from "../data/rewards.js";

function renderRewards() {
  let rewardsHTML = '';

  rewards.forEach((reward) => {
    const {name} = reward;
    const {pledgeAmt} = reward;
    const {info} = reward;
    const {quantity} = reward;

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
          <button class="btn project__btn pledge__reward-btn">
            Select Reward
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-about__pledges')
    .innerHTML = rewardsHTML;
}

renderRewards();
