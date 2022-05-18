const label = document.querySelector("label");
const input = document.querySelector("#email");
const main = document.querySelector("#main");
const btn = document.querySelector("#sub__btn");
const foot = document.querySelectorAll(".sub__foot");

// prevent default form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// capture changes in input value
input.addEventListener("input", () => {
  if (input.value === "") {
    label.classList.remove("isActive");
  } else {
    label.classList.add("isActive");
  }
});

main.addEventListener("click", function (e) {
  if (e.target === input || (e.target === btn && input.value !== "")) {
    label.classList.add("isActive");
  } else if (e.target !== input && input.value === "") {
    label.classList.remove("isActive");
  }
});

const customAxios = async (url, method, body) => {
  try {
    //get response of axios call
    const response = await axios.post(url, body);
    const finalData = response.data;

    //change html
    document.getElementById(
      "footerTitle"
    ).innerHTML = `Your original URL '${finalData.longUrl}' has been coverted into a corresponding short URL. Click on link to go the original address`;
    document.getElementById("foot").href = finalData.shortUrl;
    document.getElementById("foot").innerHTML = finalData.shortUrl;
    return finalData;
  } catch (errors) {
    //error handling
    console.error(errors);
  }
};

btn.addEventListener("click", () => {
  let message = input.value;
  const BASE_URL = "http://localhost:8080/api/url/shorten";
  //call function on button click
  customAxios(BASE_URL, "POST", {
    longUrl: message,
  });
});
