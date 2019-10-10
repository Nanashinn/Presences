var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "631566704648126503",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "9gag"
    };
    if (document.location.hostname == "9gag.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/u/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#container > div.page > div.main-wrap > div > section > header > h2");
            presenceData.details = "Viewing user:";
            presenceData.state = user.innerText;
        }
        else if (document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h2") !== null) {
            user = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h2");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing catagory:";
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/gag/")) {
            title = document.querySelector("#individual-post > article > header > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing gag:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/hot")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing what's hot";
        }
        else if (document.location.pathname.includes("/trending")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing what's trending";
        }
        else if (document.location.pathname.includes("/fresh")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing what's fresh";
        }
        else if (document.location.pathname.includes("/tag")) {
            title = document.querySelector("#container > div.page > div.main-wrap > div.profile > section > header > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing tag:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#search-hero");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
        }
    }
    else if (document.location.hostname == "about.9gag.com") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reading all about 9GAG";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.hostname == "shop.9gag.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing store page";
        }
        else if (document.location.pathname.includes("/products/")) {
            title = document.querySelector("#ProductSection-product-template > div > div:nth-child(2) > div.product-single__meta > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Shop - Viewing product:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/collections/")) {
            title = document.querySelector("#shopify-section-collection-template > div > header > div > div > h1 > span");
            replace = document.querySelector("#shopify-section-collection-template > div > header > div > div > h1 > span > span");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Shop - Viewing collection:";
            presenceData.state = title.innerText.replace(replace.innerText, "");
        }
        else if (document.location.pathname.includes("/cart")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Shop - Viewing their cart";
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#SearchInput");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Shop - Searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}