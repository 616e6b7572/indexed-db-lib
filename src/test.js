

var opts = {
		name:'store',
		opts:{ keyPath: 'id', autoIncrement: true },
		indexes:{ 
			name:'biblioid', name:'biblioid', opts:{ unique: true },
			name:'title', name:'title', opts:{ unique: false },
			name:'year', name:'year', opts:{ unique: false }
		}
}

var iDB = new IndexdDb('MyDb', opts); 

iDB.addPublication('publications', 'readwrite', {biblioid: 'ewewr', title: 'ewrw', year: 'ewrerre'});
