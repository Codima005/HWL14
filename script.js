const gradation = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent",
};

function GetMark(MarkNumber) {
  let MarkWord;

  if (MarkNumber < 20) {
    MarkWord = gradation[20];
  } else if (MarkNumber >= 20 && MarkNumber < 55) {
    MarkWord = gradation[55];
  } else if (MarkNumber >= 55 && MarkNumber < 85) {
    MarkWord = gradation[85];
  } else if (MarkNumber >= 85 && MarkNumber <= 100) {
    MarkWord = gradation[100];
  }

  return MarkWord;
};

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "JackSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "AmalSmith",
    role: "student",
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "NoahSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "CharlieSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "EmilySmith",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "LeoSmith",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];

class User {
  constructor(user) {
    this.name = user.name;
    this.age = user.age;
    this.img = user.img;
    this.role = user.role;
    if (user.courses) {
      this.courses = user.courses;
    }
  };

  render() {
    return `<div class="user__info">
                <div class="user__info--data">
                    <img src="images/users/${this.img}.png" alt=${this.name} height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role ${this.role}">
                    <img src="images/roles/${this.role}.png" alt=${this.role} height="25">
                    <p>${this.role}</p>
                </div>
            </div>`
  };

  renderCourses() {
    return this.courses.map((cours) => {
      return `<div class="user__courses" ${this.role}>
     <p class="user__courses--course ">${cours.title}<span class=${GetMark(
        cours.mark
      )}>${GetMark(cours.mark)}</span></p>
 </div>`
    });
  }
};

class Student extends User {
  constructor(user) {
    super(user);
  };
};

class Lector extends User {
  constructor(user) {
    super(user)
  };
  PreRender() {
    return this.courses.map((cours) => {
      return `
      
          <div class="user__courses--course ${this.role}">
              <p>Title: <b>${cours.title}</b></p>
              <p>Lector's score: <span class="${GetMark(
                cours.score
              )}">${GetMark(cours.score)}</span></p>
              <p>Average student's score: <span class="${GetMark(
                cours.studentsScore
              )}">${GetMark(cours.studentsScore)}</span></p>
          </div>`;
    });
  };

  renderCourses() {
    return `<div class="user__courses admin--info">${this.PreRender()}</div>`;
  };
};

class Admin extends User {
  constructor(user) {
    super(user);
  };

  PreRender() {
    return this.courses.map((cours) => {
      return `
      <div class="user__courses--course ${this.role}">
          <p>Title: <b>${cours.title}</b></p>
          <p>Admin's score: <span class="${GetMark(cours.score)}">${GetMark(
        cours.score
      )}</span></p>
          <p>Lector: <b>${cours.lector}</b></p>
      </div>`;
    });
  };

  renderCourses() {
    return `<div class="user__courses admin--info">${this.PreRender()}</div>`;
  };
};

const GROUPS = {
  student: function (user) {
    return new Student(user);
  },
  admin: function (user) {
    return new Admin(user);
  },
  lector: function (user) {
    return new Lector(user);
  },
};

let FinalRender = users
  .map(function (user) {
    return GROUPS[user.role](user);
  })

  .map(function (user) {
    let PartRender;
    PartRender = [user.render()];
    if (user.courses) {
      PartRender.push(user.renderCourses());
    }

    return `<div class="user">${PartRender.join(``)}</div>`;
  })
  .join(``);


document.write(`<div class="users">${FinalRender}<div>`);
