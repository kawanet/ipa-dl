$(function() {
  $(".btn").on("click", function() {
    var url = $(this).data("url");
    url = location.href.replace(/[^\/]*$/, "") + url;
    var plist = url + "?_=" + (new Date() - 0);
    url = "itms-services://?action=download-manifest&url=" + url;
    $.ajax(plist).done(function(xml) {
      var data = {};
      $(xml).find("key").each(function(i, e) {
        var $e = $(e);
        var $n = $e.next();
        if ($n.children().length) return;
        data[$e.text()] = $n.text();
      });
      var ipa = data.url;
      ipa = ipa && ipa.replace(/^.*\//, "");
      if (confirm(data.title + "\n" + ipa + "\nをインストールしますか")) {
        location.href = url;
      }
    });
  });
  return false;
});
