import './styles.css';

const flightOptions = document.querySelector("select");
const returnFlight = document.getElementById("returnFlight");
const form = document.querySelector("form");

flightOptions.addEventListener("change", (event)=>{
    returnFlight.value = null;
    if(event.target.value === 'round-trip'){
        returnFlight.removeAttribute('hidden');
        returnFlight.setAttribute('required', true);
    }
    else{
        returnFlight.setAttribute('hidden', true);
        returnFlight.removeAttribute('required');
    }
})

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    let departure = data.get('departure');
    let roundTrip = data.get('returnFlight');

    if(validDate(departure, roundTrip)){
        if(roundTrip){
            alert(`You have booked a round-trip flight, departing on ${departure} and returning on ${roundTrip}`)
        }
        else{
            alert(`You have booked a one-way flight on ${departure}`)
        }
    }
    else{
        alert("Please select Valid Date");
    }
})

function validDate(departure, roundTrip){
    let today = new Date();
    today.setHours(0,0,0,0);

   let departureDate = new Date(departure);
    departureDate.setHours(0,0,0,0);

     let roundTripDate = null;
     if(roundTrip){
        roundTripDate = new Date(roundTrip);
        roundTripDate.setHours(0,0,0,0);
    }

    if(departureDate<today || (roundTripDate && roundTripDate<today)){
        return false;
    }
    if(roundTripDate && departureDate>roundTripDate){
        return false;
    }

    return true;
}

// Add date validation and submission behavior here.
