angular.module('directivePractice').directive('lessonHider', function(){
  return {
    templateUrl: './html/lessonHider.html',
    restrict:'E',
    scope: {
      lesson: '=',
      dayAlert: '&',
      checker: '='
    },
    controller: function($scope, lessonService) {
      $scope.getSchedule = lessonService.getSchedule();
    },
    link: function(scope, element, attrs) {
      var checked = false;
      scope.check = false;
      scope.clicked = function(){
        if (checked) {
          element.css('text-decoration', 'none');
          checked= false;
          scope.check = false;
        }
        else {
          element.css('text-decoration', 'line-through');
          checked = true;
          scope.check = true;
        }

      };
      scope.getSchedule.then(function(response){
        scope.schedule = response.data;

        scope.schedule.forEach(function( scheduleDay ){
          if (scheduleDay.lesson === scope.lesson) {
            element.css('text-decoration', 'line-through');
            scope.lessonDay = scheduleDay.weekday;
            checked = true;
            scope.check = true;
            return;
          }
        });
      });
      // scope.checker = function () {
      //   element.css('text-decoration', 'line-through');
      // };
    }
  };
});
