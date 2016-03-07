handlers.helloWorld = function (args)
{
	var message = "Hello " + args.name;
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
	var sendPushNotificationResult = server.SendPushNotification({
		Recipient: args.playFabId,
		Message: args.message
	});
}
