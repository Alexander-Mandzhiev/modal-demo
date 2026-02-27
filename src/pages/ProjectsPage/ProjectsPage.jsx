import { useState } from 'react';
import GenericModal from '../../components/GenericModal/GenericModal';
import Button from '../../components/Button/Button';
import UniTextarea from '../../components/UniTextarea/UniTextarea';
import SingleSelect from '../../components/SingleSelect/SingleSelect';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { TIMEZONES } from '../../constants/timezones';
import styles from './ProjectsPage.module.css';

const DEFAULT_TZ = 'utc+3';

const INITIAL_PROJECTS = [
    { id: 1, name: 'Финотчёт Q1', timezone: 'utc+3', status: 'active' },
    { id: 2, name: 'Маркетинг 2026', timezone: 'utc+0', status: 'active' },
    { id: 3, name: 'Бэкенд API v2', timezone: 'utc-5', status: 'paused' },
];

function tzLabel(value) {
    return TIMEZONES.find((tz) => tz.value === value)?.label ?? value;
}

export default function ProjectsPage() {
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [selectedTz, setSelectedTz] = useState(DEFAULT_TZ);
    const [projects, setProjects] = useState(INITIAL_PROJECTS);

    const handleSubmit = () => {
        if (!projectName.trim()) return;
        setProjects((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: projectName.trim(),
                timezone: selectedTz,
                status: 'active',
            },
        ]);
        setProjectName('');
        setSelectedTz(DEFAULT_TZ);
        setShowModal(false);
    };

    const handleCancel = () => {
        setProjectName('');
        setSelectedTz(DEFAULT_TZ);
        setShowModal(false);
    };

    return (
        <>
            <div className={styles.toolbar}>
                <h2 className={styles.title}>Мои проекты</h2>
                <Button onClick={() => setShowModal(true)}>
                    + Новый проект
                </Button>
            </div>

            <div className={styles.grid}>
                {projects.map((p) => (
                    <ProjectCard
                        key={p.id}
                        name={p.name}
                        timezone={tzLabel(p.timezone)}
                        status={p.status}
                    />
                ))}
            </div>

            {showModal && (
                <GenericModal
                    title="Новый проект"
                    subtitle="Введите название и часовой пояс"
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                >
                    <div className={styles.fields}>
                        <UniTextarea
                            value={projectName}
                            onChange={setProjectName}
                            placeholder="Название проекта*"
                            autoFocus
                        />
                        <SingleSelect
                            options={TIMEZONES}
                            value={selectedTz}
                            onChange={setSelectedTz}
                            placeholder="Выбрать часовой пояс"
                        />
                    </div>
                </GenericModal>
            )}
        </>
    );
}
