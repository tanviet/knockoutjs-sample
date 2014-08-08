function Task(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);
}

function TaskListViewModel() {
    // Data
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) { 
            return !task.isDone() 
        });
    });

    // Operations
    self.addTask = function() {
        self.tasks.push(new Task({ title: this.newTaskText() }));
        self.newTaskText("");
    };

    self.removeTask = function(task) { 
        self.tasks.remove(task) 
    };

    // NOTICE: All API functions are available on http://learn.knockoutjs.com/#/?tutorial=loadingsaving. These APIs will not work on localhost.

    // Load initial state from server, convert it to Task instances, then populate self.tasks
    $.getJSON("/tasks", function(allData) {
        var mappedTasks = $.map(allData, function(item) { return new Task(item) });
        self.tasks(mappedTasks);
    }); 

    // Save tasks using Ajax
    self.save = function() {
        $.ajax("/tasks", {
            data: ko.toJSON({ tasks: self.tasks }),
            type: "post", 
            contentType: "application/json",
            success: function(result) { 
                alert(result);
            }
        });
    }; 
}

$(document).ready(function() {
    ko.applyBindings(new TaskListViewModel());
});