    $(document).ready(function(){
        // ========= jPlayer config 1 ==========
        // Home player, Track player, Single post top player
        var myPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        }, [
            {
                artist: "Kyle Hall", // the artist name
                title:"Kyle Hall Live At Monsterland", // track title
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",// mp3 path
                oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg",// oga path
                poster: "assets/img/albums/poster-2.jpg",// poster image path
                duration: '03:29'// duration time in playlist
            },
            {
                artist: "Beverly James",
                title:"We are the legend",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
                poster: "assets/img/albums/poster-1.jpg",
                duration: '05:41'
            },
            {
                artist: "Grace Hopkins",
                title:"Feeling The Hum Music",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
                poster: "assets/img/albums/poster-3.jpg",
                duration: '04:05'
            },
            {
                artist: "Skollax",
                title:"Consectetur adipisicing elit",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
                poster: "assets/img/albums/poster-4.jpg",
                duration: '04:27'
            }
        ], {
            swfPath: "assets/jplayer/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            size: {width: "80px", height: "80px"}
        });
        // Show The Current Track !!
        $("#jquery_jplayer_N").on($.jPlayer.event.ready, function (event) {
            var current = myPlaylist.current;
            var playlist = myPlaylist.playlist;       
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlaying").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
        $("#jquery_jplayer_N").on($.jPlayer.event.play, function (event) {
            var current = myPlaylist.current;
            var playlist = myPlaylist.playlist;       
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlaying").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });

        // ========= jPlayer config 2 ==========
        // Sidebar player
        var myPlaylist_2 = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_W",
            cssSelectorAncestor: "#jp_container_W"
        }, [
            {
                artist: "Beverly James",
                title:"We are the legend",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
                poster: "assets/img/albums/poster-1.jpg",
                duration: '05:41'
            },
            {
                artist: "Kyle Hall",
                title:"Kyle Hall Live At Monsterland",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg",
                poster: "assets/img/albums/poster-2.jpg",
                duration: '03:29'
            },
            {
                artist: "Grace Hopkins",
                title:"Feeling The Hum Music",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
                poster: "assets/img/albums/poster-3.jpg",
                duration: '04:05'
            },
            {
                artist: "Skollax",
                title:"Consectetur adipisicing elit",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
                poster: "assets/img/albums/poster-4.jpg",
                duration: '04:27'
            }
        ], {
            swfPath: "assets/jplayer/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            size: {width: "80px", height: "80px"}
        });
        
        // Show The Current Track !!
        $("#jquery_jplayer_W").on($.jPlayer.event.ready, function (event) {
            var current = myPlaylist_2.current;
            var playlist = myPlaylist_2.playlist;       
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlayingSidebar").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
        $("#jquery_jplayer_W").on($.jPlayer.event.play, function (event) {
            var current = myPlaylist_2.current;
            var playlist = myPlaylist_2.playlist;       
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlayingSidebar").html("<span class='artist-name'>" + obj.artist + "</span>" + "<br>" + "<span class='track-name'>" + obj.title + "</span>");
                }
            });
        });
    });