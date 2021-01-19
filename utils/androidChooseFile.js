class AndroidChooseFile {
	constructor(arg) {
		// this.type = arg.type?arg.type:'*';
	}
	init(callback, acceptType) {
		console.log('开始');	
		console.log(plus.os.name.toLowerCase());	
		if (plus.os.name.toLowerCase() == "android") {
			this._openFile(callback, acceptType)
		} else {

		}
	}
	getDataColumn(main, uri, selection, selectionArgs,callback) {
	 
	        plus.android.importClass(main.getContentResolver());
	        let cursor = main.getContentResolver().query(uri, ['_data'], selection, selectionArgs,
	        null);
	        plus.android.importClass(cursor);
	        if(cursor != null && cursor.moveToFirst()) {
	        var column_index = cursor.getColumnIndexOrThrow('_data');
	        var result = cursor.getString(column_index)
	        cursor.close();
			plus.io.resolveLocalFileSystemURL(
			    result,
			    function(entry){
			         entry.file( function(file){
						 callback(file);
                          } );
 
			    },
			    function(e){
			    }
			);
 	        }
 	}
	_openFile(callback, acceptType) {

		//acceptType为你要查的文件类型"image/*"，"audio/*"，"video/*;image/*"  
		// intent.setType("image/*");
		//intent.setType("audio/*"); 
		//选择音频
		//intent.setType("video/*;image/*"); 
		//选择视频 （mp4 3gp 是android支持的视频格式）
		var that = this;
		var CODE_REQUEST = 1000;
		var main = plus.android.runtimeMainActivity();
		if (plus.os.name == 'Android') {
			var Intent = plus.android.importClass('android.content.Intent');
			var intent = new Intent(Intent.ACTION_GET_CONTENT);
			intent.addCategory(Intent.CATEGORY_OPENABLE);
 			if (acceptType) {
				intent.setType(acceptType);
			} else {
				intent.setType("*/*");
			}
			main.onActivityResult = function(requestCode, resultCode, data) {
				console.log(requestCode)
				if (requestCode == CODE_REQUEST) {
					
					var uri = data.getData();
					plus.android.importClass(uri);
					var Build = plus.android.importClass('android.os.Build');
					var isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;

					var DocumentsContract = plus.android.importClass('android.provider.DocumentsContract');
					// DocumentProvider
					if (isKitKat && DocumentsContract.isDocumentUri(main, uri)) {
						console.log("版本大于 4.4 ");
						// ExternalStorageProvider
						if ("com.android.externalstorage.documents" == uri.getAuthority()) {
							console.log("sssss")
							var docId = DocumentsContract.getDocumentId(uri);
							var split = docId.split(":");
							var type = split[0];
							if ("primary" == type) {
								var Environment = plus.android.importClass('android.os.Environment');
								let surl = Environment.getExternalStorageDirectory() + "/" + split[1];
								plus.io.resolveLocalFileSystemURL(
								    surl,
								    function(entry){
															 entry.file( function(file){
															 		 console.log(file)
								 							 		 callback(file);
								 							 		} );
									 
								    },
								    function(e){
								    }
								);
 							} else {
								var System = plus.android.importClass('java.lang.System');
								var sdPath = System.getenv("SECONDARY_STORAGE");
								if (sdPath) {
									let surl = sdPath + "/" + split[1];
									plus.io.resolveLocalFileSystemURL(
									    surl,
									    function(entry){
																 entry.file( function(file){
																 		 console.log(file)
									 							 		 callback(file);
									 							 		} );
										 
									    },
									    function(e){
									    }
									);
									//callback(sdPath + "/" + split[1]);
								}
							}
						}
						// DownloadsProvider
						else if ("com.android.providers.downloads.documents" == uri.getAuthority()) {
							console.log("sssss")
							
							var id = DocumentsContract.getDocumentId(uri);
							var ContentUris = plus.android.importClass('android.content.ContentUris');
							var contentUri = ContentUris.withAppendedId(
								//    Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
								Uri.parse("content://downloads/public_downloads"), id);
							 that.getDataColumn(main, contentUri, null, null,callback);
						}
						// MediaProvider
						else if ("com.android.providers.media.documents" == uri.getAuthority()) {
							console.log("sssss")
							
							var docId = DocumentsContract.getDocumentId(uri);
							var split = docId.split(":");
							var type = split[0];

							var MediaStore = plus.android.importClass('android.provider.MediaStore');
							console.log(type)
							if ("image" == type) {
								contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
							} else if ("video" == type) {
								contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
							} else if ("audio" == type) {
								contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
							}else {
								contentUri = MediaStore.Files.Media.EXTERNAL_CONTENT_URI;
								
							}

							var selection = "_id=?";
							var selectionArgs = new Array();
							selectionArgs[0] = split[1];
 							that.getDataColumn(main, contentUri, selection, selectionArgs,callback);
							
						}
					}
					// MediaStore (and general)
					else if ("content" == uri.getScheme()) {
						console.log("sssss")
						
  					 plus.android.importClass(main.getContentResolver());
 					 let cursor = main.getContentResolver().query(uri, ['_data'], selection, selectionArgs,
 					 null);
 					 plus.android.importClass(cursor);
 					 if(cursor != null && cursor.moveToFirst()) {
 					 var column_index = cursor.getColumnIndexOrThrow('_data');
 					 var result = cursor.getString(column_index)
 					 cursor.close();
					 plus.io.resolveLocalFileSystemURL(
					     result,
					     function(entry){
							 entry.file( function(file){
							 		 console.log(file)
 							 		 callback(file);
 							 		} );
	 
					     },
					     function(e){
 					     }
					 );
 					 }
  						
  					}
					// File
					else if ("file" == uri.getScheme()) {
 						
						//callback(uri.getPath());
						
						plus.io.resolveLocalFileSystemURL(
						    uri.getPath(),
						    function(entry){
													 entry.file( function(file){
													 		 console.log(file)
						 							 		 callback(file);
						 							 		} );
							 
						    },
						    function(e){
						    }
						);
						
					}
				}
			}
			main.startActivityForResult(intent, CODE_REQUEST);
		}
	}


}
export default AndroidChooseFile;