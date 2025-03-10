import { selectkbRules } from "../../../redux/stores/kbRulesSlicer";
import KBItemMenuList from "../../../utils/KBItemMenuList";

export default () => <KBItemMenuList storeSelector={selectkbRules} />
