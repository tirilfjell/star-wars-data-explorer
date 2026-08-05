// Built in JavaScript rather than written into the HTML, so a browser without
// JavaScript is never shown a control that cannot do anything.

export function createSortControl(container, category, onChange) {
  const options = category.sortOptions ?? [];

  if (options.length === 0) {
    return;
  }

  const field = document.createElement("div");
  field.className = "sort-control";

  const select = document.createElement("select");
  select.className = "sort-control__select";
  select.id = "sort-records";

  const label = document.createElement("label");
  label.className = "sort-control__label";
  label.setAttribute("for", select.id);
  label.textContent = "Sort by";

  options.forEach((option, index) => {
    const element = document.createElement("option");
    element.value = String(index);
    element.textContent = option.label;
    select.append(element);
  });

  select.addEventListener("change", () => {
    onChange(options[Number(select.value)]);
  });

  field.append(label, select);
  container.replaceChildren(field);
}
