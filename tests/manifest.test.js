const assert = require('assert');
const manifest = require('../manifest.json');

const ALLOWED_PERMISSIONS = ['activeTab', 'downloads', 'storage'];
const ALLOWED_HOSTS = [
  'https://*.sharepoint.com/*',
  'https://*.officeapps.live.com/*',
  'https://*.office.com/*',
];

// Required fields
assert.strictEqual(manifest.manifest_version, 3, 'Must use Manifest V3');
assert.ok(manifest.name, 'name is required');
assert.ok(manifest.version, 'version is required');
assert.ok(manifest.background?.service_worker, 'service_worker is required');

// No unexpected permissions
for (const perm of manifest.permissions) {
  assert.ok(ALLOWED_PERMISSIONS.includes(perm), `Unexpected permission: "${perm}"`);
}

// No wildcard host permissions
for (const host of manifest.host_permissions) {
  assert.ok(!host.includes('*/*/*'), `Wildcard host not allowed: "${host}"`);
  assert.ok(ALLOWED_HOSTS.includes(host), `Unexpected host: "${host}"`);
}

console.log('✅ manifest.json validation passed');
