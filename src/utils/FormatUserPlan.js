function formatUserPlan(plan) {
    if (plan) {
        switch (plan) {
            case 1:
                return "Essential";
            case 2:
                return "Pro";
            case 3:
                return "Standard";
            default:
                return "Free";
        }
    }
}

export default formatUserPlan;
