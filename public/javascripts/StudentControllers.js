promosControllers.controller('StudentDashboardCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
			if(isAuthorized($http, $location)){
			    console.log('isAuthorized');
			    
			}
			$(document).ready(function () {
			    $('html, body').animate({ scrollTop: 410 }, 1000);
			});

			$(function () {
			    $('.required-icon').tooltip({
			        placement: 'left',
			        title: 'Required field'
			    });
			});

			$(document).on('click', '.btn-add', function (e) {
			    e.preventDefault();

			    var controlForm = $('.controls form:first'),
                    currentEntry = $(this).parents('.entry:first'),
                    newEntry = $(currentEntry.clone()).appendTo(controlForm);

			    newEntry.find('input').val('');
			    controlForm.find('.entry:not(:last) .btn-add')
                    .removeClass('btn-add').addClass('btn-remove')
                    .removeClass('btn-success').addClass('btn-danger')
                    .html('<span class="glyphicon glyphicon-minus"></span>');
			}).on('click', '.btn-remove', function (e) {
			    $(this).parents('.entry:first').remove();

			    e.preventDefault();
			    return false;
			});

			$(function () {
			    $(document).on('focus', 'div.form-group-options div.input-group-option:last-child input', function () {
			        var sInputGroupHtml = $(this).parent().html();
			        var sInputGroupClasses = $(this).parent().attr('class');
			        $(this).parent().parent().append('<div class="' + sInputGroupClasses + '">' + sInputGroupHtml + '</div>');
			    });

			    $(document).on('click', 'div.form-group-options .input-group-addon-remove', function () {
			        $(this).parent().remove();
			    });
			});

	    /* 
            Selects 
        */
			$(function () {

			    var values = new Array();

			    $(document).on('change', '.form-group-multiple-selects .input-group-multiple-select:last-child select', function () {

			        var selectsLength = $('.form-group-multiple-selects .input-group-multiple-select select').length;
			        var optionsLength = ($(this).find('option').length) - 1;

			        if (selectsLength < optionsLength) {
			            var sInputGroupHtml = $(this).parent().html();
			            var sInputGroupClasses = $(this).parent().attr('class');
			            $(this).parent().parent().append('<div class="' + sInputGroupClasses + '">' + sInputGroupHtml + '</div>');
			        }

			        updateValues();

			    });

			    $(document).on('change', '.form-group-multiple-selects .input-group-multiple-select:not(:last-child) select', function () {

			        updateValues();

			    });

			    $(document).on('click', '.input-group-addon-remove', function () {
			        $(this).parent().remove();
			        updateValues();
			    });

			    function updateValues() {
			        values = new Array();
			        $('.form-group-multiple-selects .input-group-multiple-select select').each(function () {
			            var value = $(this).val();
			            if (value != 0 && value != "") {
			                values.push(value);
			            }
			        });

			        $('.form-group-multiple-selects .input-group-multiple-select select').find('option').each(function () {
			            var optionValue = $(this).val();
			            var selectValue = $(this).parent().val();
			            if (in_array(optionValue, values) != -1 && selectValue != optionValue) {
			                $(this).attr('disabled', 'disabled');
			            }
			            else {
			                $(this).removeAttr('disabled');
			            }
			        });
			    }

			    function in_array(needle, haystack) {
			        var found = 0;
			        for (var i = 0, length = haystack.length; i < length; i++) {
			            if (haystack[i] == needle) return i;
			            found++;
			        }
			        return -1;
			    }
			});
			$(function () {
			    $('.list-group.checked-list-box .list-group-item').each(function () {

			        // Settings
			        var $widget = $(this),
                        $checkbox = $('<input type="checkbox" class="hidden" />'),
                        color = ($widget.data('color') ? $widget.data('color') : "primary"),
                        style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
                        settings = {
                            on: {
                                icon: 'glyphicon glyphicon-check'
                            },
                            off: {
                                icon: 'glyphicon glyphicon-unchecked'
                            }
                        };

			        $widget.css('cursor', 'pointer')
			        $widget.append($checkbox);

			        // Event Handlers
			        $widget.on('click', function () {
			            $checkbox.prop('checked', !$checkbox.is(':checked'));
			            $checkbox.triggerHandler('change');
			            updateDisplay();
			        });
			        $checkbox.on('change', function () {
			            updateDisplay();
			        });


			        // Actions
			        function updateDisplay() {
			            var isChecked = $checkbox.is(':checked');

			            // Set the button's state
			            $widget.data('state', (isChecked) ? "on" : "off");

			            // Set the button's icon
			            $widget.find('.state-icon')
                            .removeClass()
                            .addClass('state-icon ' + settings[$widget.data('state')].icon);

			            // Update the button's color
			            if (isChecked) {
			                $widget.addClass(style + color + ' active');
			            } else {
			                $widget.removeClass(style + color + ' active');
			            }
			        }

			        // Initialization
			        function init() {

			            if ($widget.data('checked') == true) {
			                $checkbox.prop('checked', !$checkbox.is(':checked'));
			            }

			            updateDisplay();

			            // Inject the icon if applicable
			            if ($widget.find('.state-icon').length == 0) {
			                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
			            }
			        }
			        init();
			    });

			    $('#get-checked-data').on('click', function (event) {
			        event.preventDefault();
			        var checkedItems = {}, counter = 0;
			        $("#check-list-box li.active").each(function (idx, li) {
			            checkedItems[counter] = $(li).text();
			            counter++;
			        });
			        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
			    });
			});

	    /**
*   I don't recommend using this plugin on large tables, I just wrote it to make the demo useable. It will work fine for smaller tables 
*   but will likely encounter performance issues on larger tables.
*
*		<input type="text" class="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
*		$(input-element).filterTable()
*		
*	The important attributes are 'data-action="filter"' and 'data-filters="#table-selector"'
*/
			(function () {
			    'use strict';
			    var $ = jQuery;
			    $.fn.extend({
			        filterTable: function () {
			            return this.each(function () {
			                $(this).on('keyup', function (e) {
			                    $('.filterTable_no_results').remove();
			                    var $this = $(this), search = $this.val().toLowerCase(), target = $this.attr('data-filters'), $target = $(target), $rows = $target.find('tbody tr');
			                    if (search == '') {
			                        $rows.show();
			                    } else {
			                        $rows.each(function () {
			                            var $this = $(this);
			                            $this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
			                        })
			                        if ($target.find('tbody tr:visible').size() === 0) {
			                            var col_count = $target.find('tr').first().find('td').size();
			                            var no_results = $('<tr class="filterTable_no_results"><td colspan="' + col_count + '">No results found</td></tr>')
			                            $target.find('tbody').append(no_results);
			                        }
			                    }
			                });
			            });
			        }
			    });
			    $('[data-action="filter"]').filterTable();
			})(jQuery);

			$(function () {
			    // attach table filter plugin to inputs
			    $('[data-action="filter"]').filterTable();

			    $('.container').on('click', '.panel-heading span.filter', function (e) {
			        var $this = $(this),
                            $panel = $this.parents('.panel');

			        $panel.find('.panel-body').slideToggle();
			        if ($this.css('display') != 'none') {
			            $panel.find('.panel-body input').focus();
			        }
			    });
			    $('[data-toggle="tooltip"]').tooltip();
			})

	}]);



promosControllers.controller('StudentStudentsCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
	}]);

promosControllers.controller('StudentMessagesCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
	}]);

promosControllers.controller('StudentDissertationsCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
	}]);

promosControllers.controller('StudentAgendaCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
				$.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
					var date = new Date();
					var d = date.getDate();
					var m = date.getMonth();
					var y = date.getFullYear();
					
					$('#calendar').fullCalendar({
						header: {
							left: 'prev,next today',
							center: 'title',
							right: 'month,agendaWeek,agendaDay'
						},
						editable: true,
						events: [
							{
								title: 'SDPM: Business event',
								start: new Date(y, m, 4, 14, 0),
								allDay: false,
								url: 'https://github.com/Xunnsz/Promos'
							},
							{
								title: 'SDPM: PROMOS system (working)',
								start: new Date(2014, 10, 22),
								end: new Date(2014, 11, 3)
							},
							{
								id: 999,
								title: 'Feedback dissertation',
								start: new Date(2014, m, 8, 16, 0),
								allDay: false
							},
                            {
                                id: 999,
                                title: 'Feedback dissertation',
                                start: new Date(2014, m, 8 + 7, 16, 0),
                                allDay: false
                            },
                            {
                                id: 999,
                                title: 'Feedback dissertation',
                                start: new Date(2014, m, 8 + 7+7, 16, 0),
                                allDay: false
                            },
                            {
                                title: 'Defense dissertation',
                                start: new Date(y, m, 4, 16, 0),
                                allDay: false,
                             
                            },

							

						]
					});
				});
	}]);