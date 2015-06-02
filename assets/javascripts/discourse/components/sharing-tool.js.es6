import showModal from 'discourse/lib/show-modal';

export default Ember.Component.extend({
  layoutName: 'components/sharing-tool',

  actions: {
    share: function(view, type) {
      const controller = Discourse.__container__.lookup('controller:interstitial');

      controller.
        set("model", this.get("topic")).
        set("model.share_kind", type);

      if (!type === "email") {
        showModal('interstitial', {model: this.get("topic"), title: "interstitial.title"});
      } else {
        const win = window.open("mailto:?subject=" + this.get("topic.title") + "&body=" + document.location.href);

        setTimeout(function() { win.close(); }, 1000);
      }

      controller.track("click", "topic", "sharing-tools");
    }
  }
});
