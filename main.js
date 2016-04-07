handlers.helloWorld = function (args)
{
	var message = "Hi " + args.name;
	log.info(message);

	return { messageValue: message };
}

handlers.UpdateCurrency = function (args)
{
	if(args.amount>=0){
		var addCurrencyResult = server.AddUserVirtualCurrency({
			PlayFabId: currentPlayerId,
			VirtualCurrency: args.code,
			Amount: args.amount
		});
	}else{
		var subtractCurrencyResult = server.SubtractUserVirtualCurrency({
			PlayFabId: currentPlayerId,
			VirtualCurrency: args.code,
			Amount: args.amount*-1
		});
	}

	var dict ={};
	dict[args.key]= args.curAmount;
	
	var updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: dict,
		Permission: "Public"
	});

	return "OK";
}

handlers.SendPush = function (args)
{
	if(args.roomName!=""){
		var dict ={};
		dict["ROOM_KEY"] = args.roomName;
		dict["INVITATION_PLAYER"] = currentPlayerId;
		
		var updateUserDataResult = server.UpdateUserData({
		PlayFabId: args.playFabId,
		Data: dict,
		Permission: "Public"
		});
	}
	
	var sendPushNotificationResult = server.SendPushNotification({
		Recipient: args.playFabId,
		Message: args.message
	});
}


handlers.RetrievePush = function (args)
{
	var userData = server.GetUserData({ PlayFabId: currentPlayerId });

	var result = {
		"ROOM_KEY" : userData.Data["ROOM_KEY"].Value,
		"INVITATION_PLAYER" : userData.Data["INVITATION_PLAYER"].Value
	};

	var dict ={};
	dict["ROOM_KEY"] = "";
	dict["INVITATION_PLAYER"] = "";

	var updateUserDataResult = server.UpdateUserData({
	PlayFabId: currentPlayerId,
	Data: dict,
	Permission: "Public"
	});
	
	return result;
}
