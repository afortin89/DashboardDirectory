Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
	title: 'Dashboard Directory',
	launch: function() {
		
		var context = this.getContext();
		var project = context.getProject();

		var scopeup = '';
		if(context.getProjectScopeUp()){
			scopeup = 'u';
		}
		var scopedown = '';
		if(context.getProjectScopeDown()){
			scopedown = 'd';
		}
		
		var serverurl = '';
		
		var projID = project.ObjectID + scopeup + scopedown;
		
		var server = context.getWorkspace()._ref;
		if(server.indexOf('loginapirally1')>-1) {
			serverurl = 'rally1.rallydev.com/#/';
		}else{
			serverurl = 'loginapirally1.rallydev.com/#/';
		}
		
		// Define the Model
		Ext.define('LinkList', {
			extend: 'Ext.data.Model',
			fields: [{
				name: 'name',
				type: 'string'
			}, {
				name: 'url',
				type: 'string'
			}, {
				name: 'scope',
				type: 'string'
			}],
			proxy: {
				type: 'memory',
				data: {
					success: true,
					children: [{
						name: 'BPO',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'BPO Project Report',
							url: serverurl + projID + '/custom/45199043924',
							scope: 'Radian',
							leaf: true
						},{
							name: 'BPO Portfolio View (by Domain)',
							url: serverurl + projID + '/custom/47526813142',
							scope: 'Radian',
							leaf: true
						},{
							name: 'User Stories by Initiative',
							url: serverurl + projID + '/custom/45498532333',
							scope: 'Radian',
							leaf: true
						},{
							name: 'MVIs + MMPs',
							url: serverurl + projID + '/custom/40687632056',
							scope: 'Radian',
							leaf: true
						}]
					},{
						name: 'BBA',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'Story State Kanban',
							url: serverurl + projID + '/custom/38563575107',
							scope: 'Radian',
							leaf: true
						}]
					},{
						name: 'UAT',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'UAT Queues',
							url: serverurl + projID + '/custom/39844596088',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'UAT Assignment',
							url: serverurl + projID + '/custom/39895777257',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'UAT Triage',
							url: serverurl + projID + '/custom/45135606916',
							scope: 'Radian',
							leaf: true	
						}, {
							name: 'Features by Initiative - UAT',
							url: serverurl + projID + '/custom/45700032170',
							scope: 'Radian',
							leaf: true								
						}]
					}, {
						name: 'Program',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'Initiative Burnup - I46',
							url: serverurl + projID + '/custom/45635211492',
							scope: 'Radian',
							leaf: true	
						}, {
							name: 'OAF Features',
							url: serverurl + projID + '/custom/45553318890',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'OAF Prod Readiness Stories',
							url: serverurl + projID + '/custom/45994900837',
							scope: 'Radian',
							leaf: true	
						}]
					}]
				}
			}
		});

		// Create the Store
		var store = Ext.create('Ext.data.TreeStore', {
			model: 'LinkList'
		});

		// Create the Panel
		var linkPanel = Ext.create('Ext.tree.Panel', {
			width: '100%',
			height: 400,
			autoScroll: true,
			store: store,
			rootVisible: false,
			hideHeaders: true,
			lines: true, // will show lines to display hierarchy.    
			useArrows: true,
			renderTo: Ext.getBody(),
			columns: [{
				xtype: 'treecolumn',
				dataIndex: 'name',
				flex: 1,
				renderer: function(value, meta, record) {
					if(record.get('leaf')) {
						var link = record.get('url');
						var text = record.get('name');
						var linkvalue = '<a href="' + link + '" target="_blank">' + text + '</a>';
						return linkvalue;
					}
					return value;
				}
			}]
		});
		this.add(linkPanel);
		
	}
	
});