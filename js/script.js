/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const studentsPerPage= 9 //variable that will be used to make sure there are 9 students on each page. 
function showPage (list, page){  //function to display the students from the data list on the page. 
   const startIndex = (page * studentsPerPage) - studentsPerPage; // determines which student to start and end on the page. 
   const endIndex = (page * studentsPerPage) -1;
   const studentList= document.querySelector(".student-list") // selects the ul from html file using the className student-list.
   studentList.innerHTML= ''; //prevents students from previous page from staying on the page after moving to next page.
   if(list.length === 0){ //if statement to display no results if the list of students is equal to zero after the search input.
      let noResult= `
            <p class="no-results">No results found matching your search</p>
      `; 
      const printNoResult = document.createElement("div")
      printNoResult.innerHTML= noResult
      studentList.insertAdjacentElement("beforeend", printNoResult ) //creates an new element to showcase the <P> with no results. 
      }else {
         for (let i=0; i< list.length; i++){ //for loop to loop through the student list. 
            if(i>= startIndex && i<= endIndex){ // if statement to showcase the students details if their number on the list is between the start and end Index.
             const html= `
                  <li class="student-item cf">
                     <div class="student-details">
                        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                        <h3>${list[i].name.first} ${list[i].name.last}</h3>    
                        <span class="email">${list[i].email}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">Joined ${list[i].registered.date}</span>
                     </div>
                  </li>
               `;
               const printStudents = document.createElement("div")
               printStudents.innerHTML= html
               studentList.insertAdjacentElement("beforeend", printStudents);   //create new element to actually print the students detail on the page.
            }
         }    
   }
}

function addPagination(list){ // function to add pagination buttons 
   const numberOfButtons= Math.ceil(list.length / studentsPerPage) // calculate the number of pages needed.
   const linkList= document.querySelector(".link-list") //selects the ul from html with className link-list.
   linkList.innerHTML= ''; 
   for(let i=1; i<= numberOfButtons; i++ ){ //loop through the page buttons and show each page number.
      const html= `
      <li> 
          <button type= "button">${i}</button>
      </li>
    `;
      linkList.insertAdjacentHTML("beforeend", html);    //add <li> element to print the page numbers on the page.
   }
   linkList.querySelector("button").classList.add("active"); // adds the class active to the first page button 
   linkList.addEventListener('click', (e) => { //event listener to call the showPage function and change pages when page buttons are clicked
   const activeButton= linkList.querySelector(".active") //variable stores active page number
   const clickedButton= e.target.closest("button") // variable for the clicked button 
      if(clickedButton) { // if statement to remove active class from previous active page number and add active class to newly clicked page number.
         activeButton.classList.remove("active");
         clickedButton.classList.add("active")
         showPage(data, clickedButton.innerHTML); //call showPage function with data and page number clicked passed in it
      }
   })
}

// Call functions
showPage(data, 1);
addPagination(data);

const header= document.querySelector(".header") //selected header tag by class to insert search Bar in header
const search= `
<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button" class= "submit"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;    
header.insertAdjacentHTML("beforeend", search)  //insert search bar in header
const searchBar= document.getElementById("search") //store search input
const searchButton= document.querySelector('button.submit') //store search button 
searchBar.addEventListener('keyup', () => { //event listener to sort through search list from search input and show case filtered student list
   const searchInput= searchBar.value.toUpperCase(); //variable store search input that is case insensitive
   searchButton.onclick= () => { //once the search button is clicked it goes back to a value of an empty string
      searchBar.value= '';
   }
   const studentListFiltered= data.filter(function (students){ //store filtered student list that returns the results that match search input.
      return (students.name.first.toUpperCase().includes(searchInput) || students.name.last.toUpperCase().includes(searchInput));
   });
   showPage(studentListFiltered, 1); //calls showPage  and addPagination functions again but with filtered student list that match search 
   addPagination(studentListFiltered);
})
