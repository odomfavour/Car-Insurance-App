// variables
const form = document.getElementById('request-quote');

const html = new HTMLUI();


// Event listeners

eventListeners();

function eventListeners() {
    
    document.addEventListener("DOMContentLoaded", function(){
        // create option
        
        html.displayYears();
        
        
    });

    // When the form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // read values from the form

        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;

        // read the radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;
        

        // check that all the fields have something
        if(make === '' || year === '' || level === '') {
           html.displayError('All the fields are mandatory');
        } else {
            // Make the quotaton
            const insurance = new Insurance(make, year, level);

            const price = insurance.calculateQuotation(insurance);
            // console.log(price)

            // Print the result from the HTMLUI();
            html.showResult(price);
        }

        
    });

}





// objects
// everything related to the insurance and calculation
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level
}

// Cslculate the price for the current Quotation
Insurance.prototype.calculateQuotation = function(insurance) {
    let price;
    const base = 2000;

    // get the make
    const make = insurance.make;

    /* 1 = american 15%
       2 = Asian 5%
       3 = European 35%;

       */
      switch(make) {
          case 'american': 
                price = base * 1.15;
                break;
          case 'asian':
              price = base * 1.05;
              break;
          case 'european':
              price = base * 1.35;
              break;
      }
      

      // Get the year
      const year = insurance.year;

      const difference = this.getYearDifference(year);
    //   console.log(difference);

      // each year the cost of the insurance will be 3% cheaper

      price = price - ((difference * 3 * price))/ 100;
    //   console.log(price);

    // Check the level of insurance
    const level = insurance.level;
    price = this.calculateLevel(price, level);
    return price;



      // get the years difference
}

// Returns the differeance between years
    Insurance.prototype.getYearDifference = function(year) {
        return new Date().getFullYear() - year;
        
    }

// Adds to the value based on the level of protection
Insurance.prototype.calculateLevel = function(price, level) {
    /* basic insurance = 30%
    complete insurance = 50%
    */

    if(level === 'basic') {
        price =  (0.3 * price) + price;
    }else {
        price = (0.5 * price) + price;
    }
    return price;
}

// html related

function HTMLUI() {}    


// Displays the latest 20 years
HTMLUI.prototype.displayYears = function() {
    // Max and min

    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYears = document.getElementById('year');
    for(var i = max; i > min; i--){
       const option = document.createElement('option');
       option.value = i;
       option.textContent = i;
       selectYears.appendChild(option);

    }
    console.log(max);
    console.log(min);
}


HTMLUI.prototype.displayError = function(message) {
    // create a div
    const div = document.createElement('div');
    div.classList = 'error';


    // insert the message
    div.innerHTML = `<p>${ message }</p>`;

    form.insertBefore(div, document.querySelector('#country-label'));

    // remove the error message
    setTimeout(function() {
        document.querySelector('.error').remove()
    }, 3000);

}

// Prints the result into