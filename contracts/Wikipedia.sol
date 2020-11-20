pragma solidity ^0.5.0;

contract Wikipedia {
  struct Article {
    string content;
  }

  uint[] public ids;
  mapping (uint => Article) public articlesById;

  constructor() public {
    uint index = 0;
    ids.push(index);

    Article memory newArticle = Article("This is your first article in your contract 43");
    articlesById[index] = newArticle;
  }

  function articleContent(uint index) public view returns (string memory) {
    return articlesById[index].content;
  }

  function getAllIds() public view returns (uint[] memory) {
    return ids;
  }
  // Write your code here.
  
  function submit(uint id, string memory content) public returns (string memory) {
    ids.push(id);
    Article memory newArticle = Article(content);
    articlesById[id] = newArticle;
    return content;
  }
  function updateArticle(uint id, string memory newContent) public returns (bool) {
    delete articlesById[id];
    Article memory article = Article(newContent);
    articlesById[id] = article;
    return true;
  }
}
