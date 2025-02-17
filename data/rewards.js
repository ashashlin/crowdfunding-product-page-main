import { renderSelectModal } from "../scripts/selectModal.js";

export let rewards = JSON.parse(localStorage.getItem('rewards')) || [{
  id: '1',
  name: 'Bamboo Stand',
  pledgeAmt: 25,
  quantity: 101,
  info: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list."
},{
  id: '2',
  name: 'Black Edition Stand',
  pledgeAmt: 75,
  quantity: 64,
  info: "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
},{
  id: '3',
  name: 'Mahogany Special Edition',
  pledgeAmt: 200,
  quantity: 0,
  info: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included."
}];

let rewardSelected;

export function selectReward() {
  document.querySelectorAll('.js-select-reward')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {rewardId} = button.dataset;
        rewardSelected = rewardId;
        localStorage.setItem('rewardSelected', rewardSelected);

        renderSelectModal();

        const selectModal = document.querySelector('.js-project__select-modal');

        selectModal.showModal();
      });
    });
}

export function updateRewardSelected(rewardId) {
    rewardSelected = rewardId;
    localStorage.setItem('rewardSelected', rewardSelected);
}
