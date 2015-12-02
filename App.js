Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
	title: 'Dashboard Directory',
	launch: function() {
		
		var project = this.getContext().getProject();
		var projectID = project.ObjectID;
		
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
							url: 'https://rally1.rallydev.com/#/' + projectID + 'd/custom/45199043924',
							scope: 'Radian',
							leaf: true
						},{
							name: 'BPO Portfolio View (by Domain)',
							url: 'https://rally1.rallydev.com/#/44988539736d/custom/47526813142',
							scope: 'Radian',
							leaf: true
						},{
							name: 'User Stories by Initiative',
							url: 'https://rally1.rallydev.com/#/44988539736d/custom/45498532333',
							scope: 'Radian',
							leaf: true
						}]
					},{
						name: 'UAT',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'UAT Queues',
							url: '#/' + projectID + 'd/custom/39844596088',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'UAT Assignment',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/39895777257',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'UAT Triage',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/45135606916',
							scope: 'Radian',
							leaf: true	
						}, {
							name: 'Features by Initiative - UAT',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/45700032170',
							scope: 'Radian',
							leaf: true								
						}]
					}, {
						name: 'Program',
						leaf: false, 
						expanded: true,
						children: [{
							name: 'Initiative Burnup - I46',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/45635211492',
							scope: 'Radian',
							leaf: true	
						}, {
							name: 'OAF Features',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/45553318890',
							scope: 'Radian',
							leaf: true
						}, {
							name: 'OAF Prod Readiness Stories',
							url: 'https://rally1.rallydev.com/#/37192747640d/custom/45994900837',
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
			// title: 'Dashboard Directory',
			width: '100%',
			height: 400,
			// layout: {
				// type: 'fit',
				// align: 'stretch'
			// },
			autoScroll: true,
			store: store,
			rootVisible: false,
			hideHeaders: true,
			lines: true, // will show lines to display hierarchy.    
			useArrows: true, //this is a cool feature - converts the + signs into Windows-7 like arrows. "lines" will not be displayed
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