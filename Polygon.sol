// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BatchTransferERC20 {
    // Function to perform batch transfers of an ERC20 token
    function transferBatchERC20(IERC20 token, address[] calldata _to, uint256[] calldata _amounts) external {
        require(_to.length == _amounts.length, "Arrays must be of the same length");

        for (uint i = 0; i < _to.length; i++) {
            uint256 senderBalance = token.balanceOf(msg.sender);
            require(_amounts[i] <= senderBalance, "Insufficient balance");
            bool sent = token.transfer(_to[i], _amounts[i]);
            require(sent, "Token transfer failed");
        }
    }
}
