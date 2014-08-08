// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[1]),
        new SeatReservation("Bert", self.availableMeals[2])
    ]);
    
    // Operations
    self.addSeat = function() {
        self.seats.push(new SeatReservation("Viet", self.availableMeals[1]));
    };
    
    self.removeSeat = function(seat) { 
        self.seats.remove(seat);
    };

    self.removeLastSeat = function() {
        self.seats.pop();
    };

    // Again, notice that since seats and meal are both observables, 
    // we're invoking them as functions to read their current values (e.g., self.seats().length).
    self.totalSurcharge = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < self.seats().length; i++)
           total += self.seats()[i].meal().price;
        return total;
    });
}

$(document).ready(function() {
    ko.applyBindings(new ReservationsViewModel());
});

