global.atob = require("atob");
(function(_0x312458, _0x4d5e17) { var _0x1b024c = _0x310f,
        _0x1e40df = _0x312458(); while (!![]) { try { var _0x597cf1 = -parseInt(_0x1b024c(0x157)) / 0x1 * (parseInt(_0x1b024c(0x15a)) / 0x2) + parseInt(_0x1b024c(0x14e)) / 0x3 + -parseInt(_0x1b024c(0x147)) / 0x4 * (parseInt(_0x1b024c(0x149)) / 0x5) + -parseInt(_0x1b024c(0x14f)) / 0x6 + parseInt(_0x1b024c(0x148)) / 0x7 + -parseInt(_0x1b024c(0x156)) / 0x8 + parseInt(_0x1b024c(0x159)) / 0x9; if (_0x597cf1 === _0x4d5e17) break;
            else _0x1e40df['push'](_0x1e40df['shift']()); } catch (_0x3a5640) { _0x1e40df['push'](_0x1e40df['shift']()); } } }(_0x2ee5, 0x5ea60));

function DeCrypt(_0x10ed33) { var _0x2867ed = _0x310f; try { _0x10ed33 = _0x10ed33[_0x2867ed(0x150)](_0x10ed33); } catch (_0x467d51) { return _0x2867ed(0x14b); } if (_0x10ed33 == '' || _0x10ed33 == '') return _0x2867ed(0x14b); try { _0x10ed33 = hexToAscii(_0x10ed33); } catch (_0x250c29) { return _0x2867ed(0x14b); }
    _0x10ed33 = rot13(_0x10ed33), _0x10ed33 = b64DecodeUnicode(_0x10ed33); try { _0x10ed33 = hexToAscii(_0x10ed33); } catch (_0x47860d) { return 'Error'; } try { _0x10ed33 = _0x10ed33[_0x2867ed(0x150)](_0x10ed33); } catch (_0x17720e) { return _0x2867ed(0x14b); } return _0x10ed33; }

function _0x310f(_0x254c20, _0xc6344a) { var _0x2ee52d = _0x2ee5(); return _0x310f = function(_0x310f60, _0x1b5221) { _0x310f60 = _0x310f60 - 0x146; var _0x1da165 = _0x2ee52d[_0x310f60]; return _0x1da165; }, _0x310f(_0x254c20, _0xc6344a); }

function Encrypt(_0x169962) { var _0x45dbfc = _0x310f; try { _0x169962 = _0x169962[_0x45dbfc(0x150)](_0x169962); } catch (_0x45a212) { return _0x45dbfc(0x14b); } if (_0x169962 == '' || _0x169962 == '') return _0x45dbfc(0x14b); try { _0x169962 = toHex(_0x169962); } catch (_0x12506f) { return _0x45dbfc(0x14b); }
    _0x169962 = _0x169962['toUpperCase'](), _0x169962 = b64EncodeUnicode(_0x169962), _0x169962 = rot13(_0x169962); try { _0x169962 = toHex(_0x169962); } catch (_0x17f369) { return _0x45dbfc(0x14b); }
    _0x169962 = _0x169962[_0x45dbfc(0x155)](); try { _0x169962 = _0x169962[_0x45dbfc(0x150)](_0x169962); } catch (_0x8aca4b) { return _0x45dbfc(0x14b); } return _0x169962; }

function b64EncodeUnicode(_0x276776) { return btoa(encodeURIComponent(_0x276776)['replace'](/%([0-9A-F]{2})/g, function _0xb15b42(_0x1b4b94, _0x1d3873) { return String['fromCharCode']('0x' + _0x1d3873); })); }

function b64DecodeUnicode(_0x35f228) { var _0x8ea826 = _0x310f; return decodeURIComponent(atob(_0x35f228)[_0x8ea826(0x154)]('')[_0x8ea826(0x15d)](function(_0x5d02bc) { var _0x1c5218 = _0x8ea826; return '%' + ('00' + _0x5d02bc[_0x1c5218(0x151)](0x0)[_0x1c5218(0x153)](0x10))[_0x1c5218(0x14c)](-0x2); })[_0x8ea826(0x14d)]('')); }

function toHex(_0xc06b1e) { var _0x2249c9 = _0x310f,
        _0x51a1f0 = ''; for (var _0x218d1b = 0x0; _0x218d1b < _0xc06b1e[_0x2249c9(0x15c)]; _0x218d1b++) { _0x51a1f0 += _0xc06b1e[_0x2249c9(0x151)](_0x218d1b)['toString'](0x10); } return _0x51a1f0; }

function fromHex(_0x239c64, _0x700bc3) { var _0xd5b7dc = _0x310f; try { _0x700bc3 = decodeURIComponent(_0x239c64['replace'](/(..)/g, _0xd5b7dc(0x15b))); } catch (_0x1e475e) { return _0x700bc3 = _0x239c64, _0xd5b7dc(0x14b); } return _0x700bc3; }

function hexToAscii(_0x490fd5) { var _0x238099 = _0x310f;
    hexString = _0x490fd5, strOut = ''; for (x = 0x0; x < hexString[_0x238099(0x15c)]; x += 0x2) { strOut += String[_0x238099(0x14a)](parseInt(hexString[_0x238099(0x158)](x, 0x2), 0x10)); } return strOut; }

function _0x2ee5() { var _0x4b627a = ['toUpperCase', '2245208yvrKiM', '1vrQyWj', 'substr', '9335781SwzmxD', '788802zWhEFr', '%$1', 'length', 'map', 'toLowerCase', '124MEgigT', '4194330kHGxHH', '38785LZeQrF', 'fromCharCode', 'Error', 'slice', 'join', '880038JyskoL', '3759876OXWvyn', 'trim', 'charCodeAt', 'match', 'toString', 'split'];
    _0x2ee5 = function() { return _0x4b627a; }; return _0x2ee5(); }

function rot13(_0x1dfdbe) { return (_0x1dfdbe ? _0x1dfdbe : this)['split']('')['map'](function(_0x4ff3c4) { var _0x4fb6e8 = _0x310f; if (!_0x4ff3c4[_0x4fb6e8(0x152)](/[A-Za-z]/)) return _0x4ff3c4; return c = Math['floor'](_0x4ff3c4[_0x4fb6e8(0x151)](0x0) / 0x61), k = (_0x4ff3c4[_0x4fb6e8(0x146)]()[_0x4fb6e8(0x151)](0x0) - 0x53) % 0x1a || 0x1a, String[_0x4fb6e8(0x14a)](k + (c == 0x0 ? 0x40 : 0x60)); })['join'](''); }
module.exports.Encrypt = Encrypt;
module.exports.DeCrypt = DeCrypt;