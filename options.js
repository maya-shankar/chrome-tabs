function save_options() {
  var active = document.getElementById('activeToggle').checked;
  var reverse = document.getElementById('alphaToggle').checked;
  chrome.storage.sync.set({
    extensionActive: active,
    alphaOrder: reverse
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  // Use default value of active = true and reverse = false
  chrome.storage.sync.get({
    extensionActive: true,
    alphaOrder: false
  }, function(items) {
    document.getElementById('activeToggle').checked = items.extensionActive;
    document.getElementById('alphaToggle').checked = items.alphaOrder;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
