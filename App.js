import { useState } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { GoalInput } from './components/GoalInput';
import { GoalItem } from './components/GoalItem';

export default function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [goals, setGoals] = useState([]);

	const startAddGoalHandler = () => {
		setModalIsVisible(true);
	}

	const endAddGoalHandler = () => {
		setModalIsVisible(false);
	}

	const addGoalHandler = (enteredGoalText) => {
		const newGoal = {
			text: enteredGoalText,
			id: Math.floor(Math.random() * 1000).toString()
		}
		const newGoals = [...goals, newGoal];

		setGoals(newGoals);
		endAddGoalHandler();
	}

	const deleteGoalHandler = (id) => {
		const newGoals = goals.filter(goal => goal.id !== id);
		setGoals(newGoals);
	}

	return (
		<>
			<StatusBar style="light" />
				<View style={styles.appContainer}>
					<Button
						title='Add New Goal'
						color='#a065ec'
						onPress={startAddGoalHandler} />
					{<GoalInput
						showModal={modalIsVisible}
						addGoal={addGoalHandler}
						onCancel={endAddGoalHandler} />}
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
		</>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16,
	},
	goalsContainer: {
		flex: 5
	},
});
