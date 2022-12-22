import logo from "../assets/img/github-logo.png";
import { Container } from "./styles"
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import Button from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";

function App() {

  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo("");
        return
      } else {
        alert("Repositório já adicionado!")
      }
    } else {
      alert("Repositório não encontrado!")
    }
  }

  const handleRemoveRepo = id => {
    repos.filter((repo, index) => {
      if(repo.id === id) {
        repos.splice(index,1);
        setRepos([...repos]);
      }
    })
  }

  return (
    <Container>
      <img src={logo} alt="Logo da Dio" width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />)}
    </Container>
  );
}

export default App;
