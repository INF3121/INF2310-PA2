// generates random int between min and max
function randInt(min, max){
	return Math.floor(Math.random()*(max-min))+min;
}
// generates random character ASCII 33-126
function randChar(){
	return String.fromCharCode(randInt(33, 127));
}
// generates random char a-z
function randCharaz(){
	return String.fromCharCode(randInt(97, 123));
}
// generates random char a-z0-9
function randCharaz09(){
	return randInt(0,36)>=10?String.fromCharCode(randInt(97, 123)):String.fromCharCode(randInt(48, 58));
}
// generates random string of length betweeen min and max using randChar
function randStr(min, max){
	var str="";
	for(var i=0; i<max && (min>i || randInt(0,100)>5); i++, str+=randChar());
	return str;
}
// generates random string of length betweeen min and max using randCharaz
function randStraz(min, max){
	var str="";
	for(var i=0; i<max && (min>i || randInt(0,100)>5); i++, str+=randCharaz());
	return str;
}
// generates random string of length betweeen min and max using randCharaz09
function randStraz09(min, max){
	var str="";
	for(var i=0; i<max && (min>i || randInt(0,100)>5); i++, str+=randCharaz09());
	return str;
}
// generates a random e-mail address
function randEmail(){
	return randStraz09(1,10)+"@"+randStraz09(2,10)+"."+randStraz(2,3);
}

// types random str to location and stores it in rand randomStr_value
Selenium.prototype.doTypeRandomStr = function(locator, value){
	var str = randStr(1, 20);
	storedVars['randomStr_'+value] = str;
	this.doType(locator, str);
}

// types the same random str again that has previously been stored in randomStr_value
Selenium.prototype.doTypeRandomStrAgain = function(locator, value){
	this.doType(locator, storedVars['randomStr_'+value]);
}

// types random e-mail address and saves it to randomEmail
Selenium.prototype.doTypeRandomEmail = function(locator){
	var email = randEmail();
	storedVars['randomEmail'] = email;
	this.doType(locator, email);
}

// types the random e-mail address again that was saved to randomEmail
Selenium.prototype.doTypeRandomEmailAgain = function(locator){
	this.doType(locator, storedVars['randomEmail']);
}

// types random password and saves it to randomPw
Selenium.prototype.doTypeRandomPassword = function(locator){
	var pw = randStr(5,10);
	storedVars['randomPw'] = pw;
	this.doType(locator, pw);
}

// types the random password again that was saved to randomPw
Selenium.prototype.doTypeRandomPasswordAgain = function(locator){
	this.doType(locator, storedVars['randomPw']);
}

// gets the last select item and stores it's label
Selenium.prototype.doStoreLastItem = function(locator){
	var e = this.page().findElement(locator).children;
	storedVars['lastItem'] = e[e.length-1].label;
}

// selects the last select item that was stored
Selenium.prototype.doSelectLastItem = function(locator){
	var e = this.page().findElement(locator).children;
	this.doSelect(locator, e[e.length-1].label);
}

// checks if currently selected is the same as the saved last select item
Selenium.prototype.doVerifyLastItem = function(locator){
	var e = this.page().findElement(locator);
	if(storedVars['lastItem'] != e.children[e.selectedIndex].label){
		throw new Error("Stored last item did not match selected")
	}
}

// verifies if the total price for all the items is correct
// requires saving of itemPrice, totalPrice and quantity (lastItem)
Selenium.prototype.doVerifyTotalPrice = function(){
	var p = parseInt(storedVars['itemPrice'].replace(/[\$,]/g, '')),
	t = parseInt(storedVars['totalPrice'].replace(/[\$,]/g, '')),
	i = parseInt(storedVars['lastItem']);
	if(i*p!=t) throw new Error(p+" is wrong total price for "+i+"x $"+t+" items");
}

// stores a random selection that is not currently selected
Selenium.prototype.doStoreRandomItem = function(locator){
	var e = this.page().findElement(locator), es = e.children,
	i = randInt(0, es.length-1);
	storedVars['randomItem'] = es[i>=e.selectedIndex?i+1:i].label;
}

// select the stored random selection
Selenium.prototype.doSelectSavedRandomItem = function(locator){
	this.doSelect(locator, storedVars['randomItem']);
}

// verify if the currently selected is the same as the randomly selected
Selenium.prototype.doVerifyRandomItem = function(locator){
	var e = this.page().findElement(locator);
	if(storedVars['randomItem'] != e.children[e.selectedIndex].label){
		throw new Error("Stored random item did not match selected");
	}
}
