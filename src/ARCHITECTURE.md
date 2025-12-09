# Arquitectura Limpia - FrontAPI

Este proyecto sigue los principios de **Arquitectura Limpia** (Clean Architecture), separando el código en capas independientes y desacopladas.

## 📁 Estructura de Directorios

```
src/
├── core/                              # Lógica central del negocio
│   ├── domain/                        # Entidades y reglas de negocio (sin dependencias externas)
│   │   ├── entities/                  # Modelos de negocio (Categoría, Empleado, Producto, etc.)
│   │   ├── repositories/              # Interfaces de repositorios (contratos)
│   │   └── value-objects/             # Objetos de valor
│   │
│   ├── application/                   # Casos de uso (lógica de aplicación)
│   │   ├── dto/                       # Data Transfer Objects
│   │   └── use-cases/                 # Casos de uso organizados por dominio
│   │       ├── admin/                 # Casos de uso del módulo admin
│   │       ├── almacen/               # Casos de uso del módulo almacén
│   │       └── auth/                  # Casos de uso de autenticación
│   │
│   ├── data/                          # Implementación de acceso a datos
│   │   ├── repositories/              # Implementaciones concretas de repositorios
│   │   │                              # (migrado de services)
│   │   └── datasources/               # Fuentes de datos
│   │       ├── remote/                # APIs HTTP externas
│   │       └── local/                 # LocalStorage, IndexedDB, etc.
│   │
│   └── infrastructure/                # Herramientas técnicas
│       ├── http/                      # Clientes HTTP (HttpClient)
│       ├── interceptors/              # Interceptores HTTP
│       ├── mappers/                   # Mapeo de datos entre capas
│       └── config/                    # Configuración (routes, app.config)
│
├── presentation/                      # Capa de presentación (Angular)
│   ├── modules/                       # Módulos por funcionalidad
│   │   ├── admin/                     # Módulo de administración
│   │   │   ├── pages/                 # Páginas/contenedores
│   │   │   │   ├── inicio/
│   │   │   │   ├── registro-admin/
│   │   │   │   ├── registro-categorias/
│   │   │   │   ├── registro-empleados/
│   │   │   │   └── registro-usuarios/
│   │   │   └── components/            # Componentes reutilizables
│   │   │       └── formularios/       # Componentes de formularios
│   │   │
│   │   └── almacen/                   # Módulo de almacén
│   │       ├── pages/                 # Páginas/contenedores
│   │       │   ├── registro-productos/
│   │       │   ├── registro-proveedor/
│   │       │   └── registro-salida/
│   │       └── components/            # Componentes reutilizables
│   │           └── formularios/       # Componentes de formularios
│   │
│   ├── shared/                        # Recursos compartidos entre módulos
│   │   ├── components/                # Componentes globales (Loading, MostrarErrores)
│   │   ├── guards/                    # Guards de rutas
│   │   ├── directives/                # Directivas personalizadas
│   │   ├── pipes/                     # Pipes personalizados
│   │   ├── interceptors/              # Interceptores de presentación
│   │   ├── utils/                     # Funciones utilitarias
│   │   └── styles/                    # Estilos globales
│   │
│   ├── layouts/                       # Plantillas de layout (menu)
│   ├── app.component.*                # Componente raíz
│   └── environments/                  # Configuraciones por ambiente
```

## 🔄 Flujo de Datos (Unidireccional)

```
Presentación → Aplicación → Dominio
                ↓
            Infraestructura
                ↓
             Datos
```

### Dependencias entre capas:

1. **Presentation**: Depende de Application, Infrastructure
2. **Application**: Depende de Domain
3. **Infrastructure**: Depende de Domain
4. **Data**: Depende de Domain
5. **Domain**: No depende de nada (Independiente)

## 📝 Pautas por Capa

### Domain (core/domain/)
- **Responsabilidad**: Lógica pura de negocio
- **Contenido**: Entidades, interfaces de repositorios, value objects
- **Características**: Sin dependencias externas, reutilizable
- **Ejemplo**: `Empleado`, `Producto`, `IEmpleadoRepository`

### Application (core/application/)
- **Responsabilidad**: Orquestar la lógica de negocio
- **Contenido**: Casos de uso, DTOs, servicios de aplicación
- **Características**: Utiliza Domain, accesible desde Presentation
- **Ejemplo**: `CrearEmpleadoUseCase`, `ListarProductosUseCase`

### Data (core/data/)
- **Responsabilidad**: Acceso y persistencia de datos
- **Contenido**: Implementación de repositorios, datasources
- **Características**: Implementa interfaces de Domain
- **Ejemplo**: `EmpleadoRepository`, `ProductoRemoteDataSource`

### Infrastructure (core/infrastructure/)
- **Responsabilidad**: Herramientas técnicas
- **Contenido**: HttpClient, interceptores, mappers, configuración
- **Características**: Servicios técnicos de bajo nivel
- **Ejemplo**: `HttpClient`, `LoggerInterceptor`, `EntityMapper`

### Presentation (src/presentation/)
- **Responsabilidad**: Interfaz de usuario
- **Contenido**: Componentes, páginas, layouts, guards
- **Características**: Consume Application, interactúa con usuario
- **Ejemplo**: `RegistroProductosComponent`, `AdminInitComponent`

## 🚀 Cómo Agregar una Nueva Funcionalidad

### 1. Crear la Entidad (Domain)
```typescript
// core/domain/entities/
export class MiEntidad { ... }
```

### 2. Crear la Interfaz del Repositorio (Domain)
```typescript
// core/domain/repositories/
export interface IMiRepositorio { ... }
```

### 3. Crear el DTO (Application)
```typescript
// core/application/dto/
export interface MiEntidadDTO { ... }
```

### 4. Crear el Caso de Uso (Application)
```typescript
// core/application/use-cases/
export class MiUseCaseCase { ... }
```

### 5. Implementar el Repositorio (Data)
```typescript
// core/data/repositories/
export class MiRepositorio implements IMiRepositorio { ... }
```

### 6. Crear Componentes/Páginas (Presentation)
```typescript
// presentation/modules/mi-modulo/pages/
// presentation/modules/mi-modulo/components/
```

## ✅ Beneficios

- ✨ **Independencia de Frameworks**: Cambiar Angular sin afectar la lógica
- 🧪 **Testabilidad**: Cada capa es fácil de testear
- 📦 **Escalabilidad**: Agregar nuevas funcionalidades sin complejidad
- 🔒 **Mantenibilidad**: Código organizado y responsabilidades claras
- 🔄 **Reutilización**: Lógica compartida entre diferentes interfaces

## 📚 Recursos Adicionales

- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Angular Architecture Best Practices](https://angular.io/guide/styleguide)
