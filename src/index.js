class IndexdDb{
	constructor(database, store){
		var self = this;
		this.db_name = database;
		this.request = indexedDB.open(this.db_name);
		this.request.onerror = function(event) {
			self.db_open_error(event.target);
		};
		this.request.onsuccess = function(event) {
			self.db = event.target.result;
			self.db_open_success(event.target);
		};

		this.request.onupgradeneeded = function(evt) { 
			
		  var store = evt.currentTarget.result.createObjectStore(
			'publications', { keyPath: 'id', autoIncrement: true });

		  store.createIndex('biblioid', 'biblioid', { unique: true });
		  store.createIndex('title', 'title', { unique: false });
		  store.createIndex('year', 'year', { unique: false });
			
			/*var s = evt.currentTarget.result.createObjectStore(store.name, store.opts);
			for(i in s.indexes){
				s.createIndex(s.indexes[i].name, s.indexes[i].name, s.indexes[i].opts);
			}*/
		};
	}
	db_open_error(target){
		
	}
	db_open_success(target){
		
	}
	getObjectStore(store_name, mode) {
		console.log('ostore',this.db);
		var tx = this.db.transaction(store_name, mode);
		return tx.objectStore(store_name);
	}
	addPublication(store, access, obj) {
		var store = this.getObjectStore(store, access);
		var req;
		try {
			req = store.add(obj);
		} catch (e) {
		  if (e.name == 'DataCloneError'){
			console.log("This engine doesn't know how to clone a Blob, " +
								 "use Firefox");
							 }
			throw e;
		
		}
		req.onsuccess = function (evt) {
			console.log("Insertion in DB successful");
		};
		req.onerror = function() {
			console.error("addPublication error", this.error);
		};
	}
	createStore(store, columns){

	}
}
