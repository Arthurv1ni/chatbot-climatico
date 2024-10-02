import CardSugestion from "../components/CardSugestion/CardSugestion";
import MenuSide from "../components/Sidebar/MenuSide";
import TextareaQuestion from "../components/TextareaQuestion/TextareaQuestion";
import WheaterCard from "../components/WheaterCard/WheaterCard";
import './NewConversation.css';

const NewConversation = () => {
  return (
    <div className="page-container">
      <MenuSide />
      <div className="content-container">
        <WheaterCard /> 
        <div className="interactive-area">
          <CardSugestion />
          <TextareaQuestion />
        </div>
      </div>
    </div>
  );
}

export default NewConversation;

