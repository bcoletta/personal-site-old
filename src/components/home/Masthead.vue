<template>
  <div class="ui inverted vertical masthead center aligned segment">
      <div class="ui middle aligned grid container">
        <div class="row">
          <div class="eight wide column">
            <h2 class="ui inverted header">Welcome!</h2>
            <p>
              My name is Brendan Coletta and I am a Front-end developer in St.
              Louis, Missouri. I enjoy working with HTML, CSS, JavaScript, and
              TypeScript and have professional experience working with Angular2
              and VueJS.
            </p>
          </div>
          <div class="six wide right floated column">
            <div id="computer-buttons" class="ui left floated attached vertical buttons">
              <a
                class="ui linkedin icon button"
                href="https://www.linkedin.com/in/brendancoletta/"
              >
                <i class="linkedin icon"></i>
              </a>
              <a
                class="ui blue icon button"
                href="https://drive.google.com/file/d/12flN6d7kdUZBOVjfZ-_CLDxfEvfFbE7p/view"
              >
                <i class="file alternate outline icon"></i>
              </a>
              <a
                href="mailto:bc.coletta+website@gmail.com"
                class="ui google plus icon button"
              >
                <i class="mail icon"></i>
              </a>
            </div>
            <img
              id="profile-image"
              src="@/assets/LinkedInProfilePicture1.jpg"
              class="ui left floated image"
            />
            <div id="tablet-buttons" class="ui bottom attached buttons">
              <a
                class="ui linkedin icon button"
                href="https://www.linkedin.com/in/brendancoletta/"
              >
                <i class="linkedin icon"></i>
              </a>
              <a
                class="ui blue icon button"
                href="https://drive.google.com/file/d/12flN6d7kdUZBOVjfZ-_CLDxfEvfFbE7p/view"
              >
                <i class="file alternate outline icon"></i>
              </a>
              <a
                href="mailto:bc.coletta+website@gmail.com"
                class="ui google plus icon button"
              >
                <i class="mail icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
@media only screen and (max-width: 992px) {
  #computer-buttons {
    display: none;
  }
  #profile-image {
    margin-bottom: 0;
  }
  #tablet-buttons {
    float: left;
  }
}
@media only screen and (min-width: 993px) {
  #tablet-buttons {
    display: none;
  }
}
</style>