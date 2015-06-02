export default Ember.ObjectController.extend({
  highlight: function() {
    return I18n.t('interstitial.highlight');
  }.property(),

  message: function() {
    return I18n.t('interstitial.message');
  }.property(),

  actions: {
    cancel: function() {
      this.closeModal();
    },

    proceed: function() {
      this.closeModal();

      const kind = this.get("model.share_kind");

      if (kind[0].match(/[a-z]/i) && this.strategies[kind]) this.strategies[kind].call(this);
    }
  },

  strategies: {
    facebook: function() {
      const $head = $("head"),
            url = $head.find("meta[property='og:url']").first().attr("content"),
            title = $head.find("meta[property='og:title']").first().attr("content"),
            text = $head.find("meta[property='og:description']").first().attr("content"),
            image = $head.find("meta[property='og:image']").first().attr("content");

      var pop_up_url = "https://www.facebook.com/sharer.php?s=100";

      if (url) pop_up_url += '&p[url]=' + encodeURIComponent(url);
      if (title) pop_up_url += '&p[title]=' + encodeURIComponent(title);
      if (text) pop_up_url += '&p[summary]=' + encodeURIComponent(text);
      if (image) pop_up_url += '&p[images][0]=' + encodeURIComponent(image);

      this.pop_up(pop_up_url);
    },

    twitter: function() {
      const $head = $("head"),
            text = $head.find("meta[name='twitter:title']").first().attr("content") +
              " " + $head.find("meta[name='twitter:url']").first().attr("content");

      this.pop_up('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text));
    }
  },

  closeModal: function() {
    Discourse.__container__.lookup('route:application').send('closeModal');
  },

  pop_up: function(url, w_width, w_height) {
    w_width = w_width || 550;
    w_height = w_height || 450;

    var height = screen.height,
        width = screen.width,
        top = height / 2 - w_height / 2,
        left = width / 2 - w_width / 2,
        params = 'width=' + w_width + ',height=' + w_height +
                ',left=' + left + ',top=' + top +
                ',screenX=' + left + ',screenY=' + top + ',scrollbars=1';

    window.open(url, 'sharer', params);
  }
})
