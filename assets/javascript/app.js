//When document finishes loading
$(document).ready(function(){
	//When user starts to type, we catch that using 'keyup'
	$('#searchUser').on('keyup', function(event){
		console.log('keypressed');
		//Get what user types in
		console.log(event.target.value);
		var userName = event.target.value;

		//Make request to Github API
		$.ajax({
			url: "https://api.github.com/users/" + userName,
			data:{
				client_id: '46e9a037672cca81d3da',
				client_secret: '2ed4aaa00b415311599d0038b59533f08a05f838'
			}
			//.done is the returned promise which handles the callback function which passes the data
		}).done(function(user){

			$.ajax({
				url: "https://api.github.com/users/" + userName + "/repos",
				data:{
				client_id: '46e9a037672cca81d3da',
				client_secret: '2ed4aaa00b415311599d0038b59533f08a05f838',
				sort: 'creates: asc',
				per_page: 5
				}

			}).done(function(repos){
				//Loop through the repos array
				$.each(repos, function(index, repo){
					$('#repos').append(`
							<div class = "well">
								<div class = "row">
								<div class = "col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class = "col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>

								</div>
								<div class = "col-md-2">
										<a href = "${repo.html_url}" target = "_blank" class = "btn btn-default">Repo page</a>
								</div>
								</div>
							</div>
						`);
				});
				console.log(repos);

			});
			//console.log(user);
			//es6 syntax using back ticks, you can write html directly without concatenating
			//variables in es6 within curly braces
			$('#profile').html(`
				<div class="panel panel-default">
  					<div class="panel-heading">
    					<h3 class="panel-title">${user.name}</h3>
  					</div>
  					<div class="panel-body">
    					<div class = "row">
    						<div class = "col-md-3">
    							<img class = "thumbnail avatar" src = "${user.avatar_url}">
    							<a target="_blank" href = "${user.html_url}" class = "btn btn-primary btn-block">View Profile</a>
    						</div>
    						<div class = "col-md-9">
    							<span class="label label-default">Public Repos: ${user.public_repos}</span>
								<span class="label label-primary">Public Gists: ${user.public_gists}</span>
								<span class="label label-success">Followers: ${user.public_followers}</span>
								<span class="label label-info">Following: ${user.public_following}</span>
    						
	    						<br><br>
	    						<ul class = "list-group">
	    							<li class = "list-group-item">Company: ${user.company}</li>
	    							<li class = "list-group-item">Website/blog: ${user.blog}</li>
	    							<li class = "list-group-item">Location: ${user.location}</li>
	    							<li class = "list-group-item">Member Since: ${user.created_at}</li>
	    						</ul>
    						</div>
    					</div>
 					</div>
				</div>

				<h3 class = "page-header">Latest Repos</h3>
				<div id = "repos"></div>

				`);
		});
	});
});