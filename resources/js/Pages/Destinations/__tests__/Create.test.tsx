import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent } from '@testing-library/react'
import pretty from "pretty";

import Create from "@/Pages/Destinations/Create";

let container : HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

const auth = {
  user: {
    name: "Test",
    email: "test@example.com",
  }
}

it("renders properly", () => { 
  render(<Create auth={auth} errors={{}} />, container);
});

it("displays all form inputs", () => {
  render(<Create auth={auth} errors={{}} />, container);

  expect(container.querySelectorAll(`
    [data-testid='create-form'] input,
    [data-testid='create-form'] select,
    [data-testid='create-form'] textarea,
    [data-testid='create-form'] button`).length).toEqual(5);
})

it("can update input values", () => {
  render(<Create auth={auth} errors={{}} />, container);

  let locationInput : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="location"]')!; 
  fireEvent.input(locationInput, {target: {value: "Davao, Philippines"}});
  expect(locationInput.value).toEqual('Davao, Philippines');

  let date_month_select : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="date_month"]')!; 
  fireEvent.select(date_month_select, {target: {value: 4}});
  const dateMonthVal = date_month_select.value;
  expect(container.querySelector(`[data-testid="create-form"] [name="date_month"] option[value="${dateMonthVal}"]`)?.textContent).toEqual('May');

  let date_year_select : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="date_year"]')!; 
  fireEvent.select(date_year_select, {target: {value: 2024}});
  const dateYearVal = date_year_select.value;
  expect(container.querySelector(`[data-testid="create-form"] [name="date_year"] option[value="${dateYearVal}"]`)?.textContent).toEqual('2024');

  let reasonsInput : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="reasons"]')!; 
  fireEvent.input(reasonsInput, {target: {value: "I\'m told it\'s safe there?"}});
  expect(reasonsInput.value).toEqual('I\'m told it\'s safe there?');

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
})

it("can submit new destination", async () => {
  render(<Create auth={auth} errors={{}} />, container);

  let locationInput : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="location"]')!; 
  fireEvent.input(locationInput, {target: {value: "Davao, Philippines"}});
  expect(locationInput.value).toEqual('Davao, Philippines');

  let date_month_select : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="date_month"]')!; 
  fireEvent.select(date_month_select, {target: {value: 4}});
  const dateMonthVal = date_month_select.value;
  expect(container.querySelector(`[data-testid="create-form"] [name="date_month"] option[value="${dateMonthVal}"]`)?.textContent).toEqual('May');

  let date_year_select : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="date_year"]')!; 
  fireEvent.select(date_year_select, {target: {value: 2024}});
  const dateYearVal = date_year_select.value;
  expect(container.querySelector(`[data-testid="create-form"] [name="date_year"] option[value="${dateYearVal}"]`)?.textContent).toEqual('2024');

  let reasonsInput : HTMLInputElement = container.querySelector('[data-testid="create-form"] [name="reasons"]')!; 
  fireEvent.input(reasonsInput, {target: {value: "I\'m told it\'s safe there?"}});
  expect(reasonsInput.value).toEqual('I\'m told it\'s safe there?');

  fireEvent.submit(container.querySelector('[data-testid="create-form"]')!);
  
  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
})