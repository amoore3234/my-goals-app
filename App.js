import { useState } from 'react';
import {
	StyleSheet,
	View,
	FlatList
} from 'react-native';
import { GoalInput } from './components/GoalInput';

import { GoalItem } from './components/GoalItem';

export default function App() {
	const [goals, setGoals] = useState([]);

	const addGoalHandler = (enteredGoalText) => {
		const newGoal = {
			text: enteredGoalText,
			id: Math.floor(Math.random() * 1000).toString()
		}
		const newGoals = [...goals, newGoal];

		setGoals(newGoals);
	}

	const deleteGoalHandler = (id) => {
		const newGoals = goals.filter(goal => goal.id !== id);
		setGoals(newGoals);
	}

	return (
		<View style={styles.appContainer}>
			<GoalInput addGoal={addGoalHandler} />
			<View style={styles.goalsContainer}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={goals}
					renderItem={(itemData) => {
						return <GoalItem
							text={itemData.item.text}
							id={itemData.item.id}
							onDeleteItem={deleteGoalHandler}
						/>
					}}
					alwaysBounceVertical={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16
	},
	goalsContainer: {
		flex: 5
	},
});
