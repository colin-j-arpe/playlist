let currentPlaylist = [];

function addToPlaylist(trackUrl, placement = 'end')  {
    // const trackUrl = $("input[name='track-url']").val();
    // console.log($(button).data('placement') === 'end' ? $.prototype.append : $.prototype.prepend);
    // const placement = $(button).data('placement') === 'end' ? $.prototype.append : $.prototype.prepend;
    if (placement === 'end') {
        $("#playlist").append(trackTemplate(trackUrl));
        currentPlaylist.push(trackUrl);
    }   else    {
        $("#playlist").prepend(trackTemplate(trackUrl));
        currentPlaylist.shift(trackUrl);
    }
    $("input[name='track-url']").val('').focus();
    sessionStorage['currentPlaylist'] = currentPlaylist.toString();
}

function trackTemplate(url) {
    return `<div class="track">
            ${url}
            <button class="remove">Remove</button>
        </div>`;
}

function addTrackOnEnter(key)   {
    console.log(key);
    console.log(typeof key);
    window.e = key;
    if (key !== 13) return;
    $("button[data-placement='end']").click();
}

$(document).ready(function() {
    if (sessionStorage['currentPlaylist']) {
        let previousPlaylist = sessionStorage['currentPlaylist'].split(',');
        previousPlaylist.forEach(track => addToPlaylist(track));
    }

    $("input[name='track-url']").focus();
    $("input[name='track-url']").keypress(e => addTrackOnEnter(e.originalEvent.keyCode));
    $(".update").click(e => addToPlaylist($("input[name='track-url']").val(), $(e.currentTarget).data('placement')));
    $("#playlist").on('click', e => $(e.target.parentElement).slideUp().remove())
});
