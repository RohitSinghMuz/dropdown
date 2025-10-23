Skip to content
Navigation Menu
anil-sidhu
Javascript-Output-Based-Questions

Type / to search
Code
Pull requests
Actions
Projects
Security
Insights
Owner avatar
Javascript-Output-Based-Questions
Public
forked from surbhidighe/Javascript-Output-Based-Questions
anil-sidhu/Javascript-Output-Based-Questions
Go to file
t
This branch is 11 commits behind surbhidighe/Javascript-Output-Based-Questions:master.
Name		
surbhidighe
surbhidighe
Merge pull request surbhidighe#2 from SuvadeepMukherjee/fix-typo-docu…
035da37
 · 
last year
README.md
Fix typo in question 30: correct 'console.log(age)' to 'console.log(a…
last year
Repository files navigation
README
JavaScript output based interview questions
Click ⭐ if you like it!!
Every contribution counts, regardless of its size. I value and appreciate the efforts of all contributors, from beginners to seasoned developers. Join me on this exciting journey of open-source collaboration. Together, let's build something amazing! 🤝

Contribution Guidelines
👉 Please ensure that your contributions adhere to the coding style and guidelines of this project
👉 Include clear and concise commit messages for all your commits
👉 Provide a detailed description of your changes in the pull request.
👉 Be respectful and considerate towards other contributors.
1. What will be the output

let arr = [1, 2, 3, 4, 5, -6, 7];
arr.length = 0;
console.log(arr);
View Answer
Output : [ ]
Reason : The length of the array has been set to 0, so the array becomes empty.
🔝 Scroll to Top

2. What will be the output

x = 10;
console.log(x);
var x;
View Answer
🔝 Scroll to Top

3. What will be the output

let a = { x: 1, y: 2 }
let b = a;
b.x = 3;
console.log(a);
console.log(b);
View Answer
🔝 Scroll to Top

4. What will be the output

for(var i = 0; i < 10; i++){
    setTimeout(function(){
      console.log("value is " + i);
  })
}
View Answer
Output : 10 times, "value is 10"
Reason : "var" has a function scope, and there will be only one shared binding for the iterations. By the time the setTimeout function gets executed, the for loop has already completed and the value of the variable i is 10.
🔝 Scroll to Top

5. What will be the output

for(let i = 0; i < 10; i++){
    setTimeout(function(){
      console.log("value is " + i);
  })
}
View Answer
🔝 Scroll to Top

6. What will be the output

function hello() {
  console.log("1");
    setTimeout(() => {
        console.log("2");
    })
  console.log("3");
}
hello();
View Answer
🔝 Scroll to Top

7. What will be the output

let f = "8";
let a = 1;
console.log((+f)+a+1);
View Answer
🔝 Scroll to Top

8. What will be the output

let a = 10;
if(true){
   let a = 20;
   console.log(a, "inside");
}
console.log(a, "outside");
View Answer
🔝 Scroll to Top

9. What will be the output

var a = "xyz";
var a = "pqr";
console.log(a)
View Answer
🔝 Scroll to Top

10. What will be the output

const arr1 = [1, 2, 3, 4];
const arr2 = [6, 7, 5];
const result = [...arr1, ...arr2];
console.log(result);
View Answer
🔝 Scroll to Top

11. What will be the output

const person1 = { name: 'xyz', age: 21 };
const person2 = { city: 'abc', ...person1 };
console.log(person2);
View Answer
🔝 Scroll to Top

12. What will be the output

console.log(5 < 6 < 7);
View Answer
🔝 Scroll to Top

13. What will be the output

console.log(7 > 6 > 5);
View Answer
🔝 Scroll to Top

14. What will be the output

console.log(0 == false);
console.log(1 == true);
View Answer
🔝 Scroll to Top

15. What will be the output

console.log([11, 2, 31] + [4, 5, 6]);
View Answer
🔝 Scroll to Top

16. What will be the output

console.log({} == {}); 
console.log({} === {});
View Answer
🔝 Scroll to Top

17. What will be the output

let x = 5;
let y = x++;
console.log(y);
console.log(x)
View Answer
🔝 Scroll to Top

18. What will be the output

let x = 5;
let y = ++x;
console.log(y);
console.log(x)
View Answer
🔝 Scroll to Top

19. What will be the output

console.log('apple'.split(''));
View Answer
🔝 Scroll to Top

20. What will be the output

const arr = [2,3,5,2,8,10,5];
console.log(arr.indexOf(5))
View Answer
🔝 Scroll to Top

21. What will be the output

const array = [8, 18, 28, 38];
const result = array.map(element => element + 2)
               .filter((element) => element > 25);
console.log(result);
View Answer
🔝 Scroll to Top

22. What will be the output

function checkValue(value){
    var result = Array.isArray(value);
    console.log(result);
}
checkValue([1,2,3]);
View Answer
🔝 Scroll to Top

23. What will be the output

function sum(a=5, b=7){
    return a+b;
}
console.log(sum(undefined, 20));
View Answer
🔝 Scroll to Top

24. What will be the output

console.log(10 + "5");
console.log("5" + 10);
View Answer
🔝 Scroll to Top

25. What will be the output

console.log(10 - "5");
console.log("5" - 10);
View Answer
🔝 Scroll to Top

26. What will be the output

console.log(printName());
function printName(){
    return "Hi my name is Bob"
}
View Answer
🔝 Scroll to Top

27. What will be the output

console.log(printName());
const printName = () => {
    return "Hi my name is Bob"
}
View Answer
🔝 Scroll to Top

28. What will be the output (shallow copy of an object)

const userDetails = {
  firstName: "Surbhi",
  lastName: "Dighe",
  age: 20,
  address: {
    city: "Hyderabad",
    country: "India",
  },
};

let cloneUserDetails = { ...userDetails };
//Updating original object
userDetails.age = 22;
userDetails.address.city = "Banglore";

console.log(cloneUserDetails.age); 
console.log(cloneUserDetails.address.city);
View Answer
🔝 Scroll to Top

29. What will be the output

function hello(){
console.log(name);
console.log(age);
var name = "Alice";
let age = 21;
}
hello();
View Answer
🔝 Scroll to Top

30. What will be the output

const arr1 = [1,2,3];
const arr2 = [1,2,3];
const str = "1,2,3";

console.log(arr1 == str);
console.log(arr1 == arr2);
View Answer
🔝 Scroll to Top

31. What will be the output

const a = {x : 1};
const b = {x : 1};
console.log(a === b);
console.log(a.x === b.x)
View Answer
🔝 Scroll to Top

32. What will be the output

const arr = [10, -1, 2];
arr.sort((a, b) => a - b);
console.log(arr);
View Answer
🔝 Scroll to Top

33. What will be the output

const arr = [11, 0, '', false, 2, 1];
const filtered = arr.filter(Boolean);
console.log(filtered);
View Answer
🔝 Scroll to Top

34. What will be the output

var x = 0;
var y = 10;
if(x){
  console.log(x);
}
if(y){
  console.log(y);
}
View Answer
🔝 Scroll to Top

35. What will be the output

const obj = {
var1: 1,
var2: 2
};
const { var1, var2 } = obj;
console.log(var1, var2);
View Answer
🔝 Scroll to Top

36. What will be the output

const user = { 
name: "Surbhi dighe", 
country: "India" 
};
const { name: fullname, country } = user;
console.log(fullname);
console.log(name);
View Answer
🔝 Scroll to Top

37. What will be the output

const person = {
  firstName: 'Surbhi',
};
const { lastName="dighe" } = person;
console.log(lastName);
View Answer
🔝 Scroll to Top

38. What will be the output

const person = {
  firstName: 'Surbhi',
};
const { firstName="Henry"} = person;
console.log(firstName);
View Answer
🔝 Scroll to Top

39. What will be the output

var a = 10;
let a = 20;
console.log(a)
View Answer
🔝 Scroll to Top

40. What will be the output

const arr = ["A","B","C","D","E"]
console.log(Object.keys(arr)); 
View Answer
🔝 Scroll to Top

About
Explore the world of JavaScript through practical output-based questions

Resources
 Readme
 Activity
Stars
 5 stars
Watchers
 0 watching
Forks
 2 forks
Report repository
Releases
No releases published
Packages
No packages published
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
