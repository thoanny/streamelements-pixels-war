let fieldData, channelName;
let customRewards = {};

let pixelsWarColors = {};
let pixelsWarMap = {};
let pixelsWarMax = 0;

let pixelsWarColorsMax = 9;

const fetchItems = () => {
    return new Promise(resolve => {
        fetch(`https://api.jebaited.net/twitchItems/${channelName}`).then(response => response.json()).then((obj) => {
            let rewards = obj[0]['data']['community']['channel']['communityPointsSettings']['customRewards'];
            for (let i in rewards) {
                const reward = rewards[i];
                customRewards[reward['id']] = {"cost": reward['cost'], "name": reward['title']};
            }
            resolve(true)
        });
    });
}

const loadItems = (force = 0) => {
    return new Promise(resolve => {
        if (force) {
            fetchItems().then(() => {
                SE_API.store.set('twitchCustomRewards', customRewards);
                resolve(true);
            });
        } else {
            SE_API.store.get('twitchCustomRewards').then(obj => {
                if (obj === null) {
                    loadItems(1).then(() => {
                        resolve();
                    });

                } else {
                    customRewards = obj;
                    resolve(true);
                }
            });
        }

    });
}

function initPixelsWarMap() {
    let map = {};
    for(let i=1; i<=pixelsWarMax; i++) {
        map[i] = null;
    }
    return map;
}

function setPixelsWarMap(data) {
    for (const [id, color] of Object.entries(data)) {
        if(color) {
            $(`#pixels-war-map .c${id}`).css('background-color', color);
        }
    }
}

window.addEventListener('onWidgetLoad', async function (obj) {

    // Init pixelsWarMap
    SE_API.store.get('pixelsWarMap').then(data => {
        if(!data) {
            pixelsWarMap = initPixelsWarMap();
            console.log('!data', pixelsWarMap);
        } else {
            pixelsWarMap = data;
            console.log('data', pixelsWarMap);
        }

        setPixelsWarMap(pixelsWarMap);
    });

    fieldData = obj.detail.fieldData;

    // Draw map
    let s = fieldData.canvaSize/fieldData.pixelSize;
    pixelsWarMax = s*s;
    for(let i=1; i<=pixelsWarMax; i++) {
        $('#pixels-war-map').append(`<div class="c${i}"><span>${i}</span></div>`);
    }

    // Init pixelsWarColors
    for(let i=1; i<=pixelsWarColorsMax; i++) {
        pixelsWarColors[fieldData[`c${i}name`]] = fieldData[`c${i}color`];
    }

    // Set Channel name
    channelName = obj["detail"]["channel"]["username"];

    // Init Custom Rewars
    loadItems();

    // Show pixels
    if(typeof fieldData.showPixels !== 'undefined' && fieldData.showPixels) {
        $('#pixels-war-map').addClass('show-pixels');
    }
});

window.addEventListener('onEventReceived', function (obj) {

    if (obj.detail.listener === "event:test") {
        // Refresh Custom Rewards
        if (obj.detail.event.listener === 'widget-button' && obj.detail.event.field === 'refresh') {
            loadItems(1)

            // Reset Pixels War Map
        } else if (obj.detail.event.listener === 'widget-button' && obj.detail.event.field === 'reset') {
            SE_API.store.set('pixelsWarMap', initPixelsWarMap());
            window.location.reload();
        }
        return;
    }

    if (obj.detail.listener !== "message") return;

    let rewardname = "";
    if (customRewards[obj.detail.event.data.tags['custom-reward-id']]) {
        rewardname = customRewards[obj.detail.event.data.tags['custom-reward-id']].name;
    } else if (obj.detail.event.data.tags['msg-id'] === "highlighted-message") {
        rewardname = "Highlight my message"
    } else {
        return;
    }

    let event = obj.detail.event.data;
    event['rewardname'] = rewardname;

    if(typeof pixelsWarColors[rewardname] !== 'undefined') {
        let number = parseInt(event.text);
        if(!isNaN(number) && number <= pixelsWarMax) {
            pixelsWarMap[number] = pixelsWarColors[rewardname];
            SE_API.store.set('pixelsWarMap', pixelsWarMap);
            setPixelsWarMap(pixelsWarMap);
        }
    }

});
