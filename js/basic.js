function AppViewModel() {
    /*
        Introducing Observables

        Actually, when you edit one of those text boxes, it does update the underlying viewmodel data. But because the viewmodel properties are just plain JavaScript strings, they have no way of notifying anybody that they've changed, so the UI stays static. That's why Knockout has a concept of observables - these are properties that automatically will issue notifications whenever their value changes.
        
        Remember that firstName and lastName are observables. Thus, we have to get their values with their function like that this.firstName(), this.lastName()
    */

    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");

    /*
        Very often, you'll want to combine or convert multiple observable values to make others. In this example, you might want to define full name as being first name plus space plus last name.

        To handle this, Knockout has a concept of computed properties - these are observable (i.e., they notify on change) and they are computed based on the values of other observables.
    */
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
    
    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
}

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new AppViewModel());
});