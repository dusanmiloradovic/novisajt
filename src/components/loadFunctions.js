import styles from "./../scss/variables.scss";
export const filesList = styles.filesList.split(" ");

//this will be the index of the background image to be displayed to the user. On the desktop, when the user hovers, the image will be changed. On mobile every 10 secs.

console.log(filesList);

export const hiRes = require.context("../../slk/finalno", true);

let currBackground = 0;
let currBackgroundClass = null;

let loadedBGImages = new Array(filesList.length);
for (let j = 0; j < loadedBGImages.length; j++) {
  loadedBGImages[j] = false;
}

export const preloadImage = ind => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    let pth = "./" + filesList[ind] + ".jpg";
    img.src = hiRes(pth).src; //resposive loader treba da o ovome vodi racuna
    img.srcset = hiRes(pth).srcSet;
    img.srcSet = hiRes(pth).srcSet;
    img.onload = () => {
      loadedBGImages[ind] = true;
      resolve("loaded");
    };
    img.onerror = err => {
      reject(err);
    };
    img.onabort = () => {
      reject("aborted");
    };
  });
};

export const loadBackground = ind => {
  //it will try to load the image to the browser cache first. When it is loaded it changes the background
  if (currBackgroundClass) {
    document.documentElement.classList.remove(currBackgroundClass);
  }
  currBackgroundClass = "main-bg-" + (ind + 1);
  document.documentElement.classList.add(currBackgroundClass);
  if (loadedBGImages[ind]) {
    return Promise.resolve(ind);
  } else {
    document.documentElement.classList.add("thumb");

    return preloadImage(ind).then(_ => {
      document.documentElement.classList.remove("thumb");
    });
  }
};

export const loadImages = () => {
  //wait for the first image to load, then loads the rest
  loadBackground(0).then(() => {
    for (let j = 1; j < filesList.length; j++) {
      //skip first, alerady loaded
      preloadImage(j);
    }
  });
};
